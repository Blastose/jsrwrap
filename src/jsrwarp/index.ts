import fetch from 'node-fetch';
import OAuthError from './oauthError';

type Scope =
	| 'identity'
	| 'edit'
	| 'flair'
	| 'history'
	| 'modconfig'
	| 'modflair'
	| 'modlog'
	| 'modposts'
	| 'modwiki'
	| 'mysubreddits'
	| 'privatemessages'
	| 'read'
	| 'report'
	| 'save'
	| 'submit'
	| 'subscribe'
	| 'vote'
	| 'wikiedit'
	| 'wikiread';

type accessTokenJsonResponse = {
	access_token: string;
	token_type: string;
	expires_in: string;
	scope: string;
	refresh_token?: string;
};

class Jsrwrap {
	clientId: string;
	clientSecret: string;
	accessToken: string;
	refreshToken?: string;

	constructor(accessToken: string, clientId: string, clientSecret: string, refreshToken?: string) {
		this.accessToken = accessToken;
		this.clientId = clientId;
		this.clientSecret = clientSecret;
		this.refreshToken = refreshToken;
	}

	async refreshAccessToken() {
		if (this.refreshToken) {
			const body = `grant_type=refresh_token&refresh_token=${this.refreshToken}`;
			const res = await Jsrwrap.retrieveAccessToken({
				httpBasicAuth: Jsrwrap.encodeClientIdAndSecret(this.clientId, this.clientSecret),
				body
			});

			if (res.status !== 200) {
				throw new Error('Invalid refresh_token');
			}

			this.accessToken = ((await res.json()) as accessTokenJsonResponse).access_token;
		} else {
			throw new Error('No refresh_token; cannot refresh access token');
		}
	}

	static encodeClientIdAndSecret(clientId: string, clientSecret: string) {
		const clientIdAndSecret = Buffer.from(`${clientId}:${clientSecret}`);
		return clientIdAndSecret.toString('base64');
	}

	static async retrieveAccessToken(options: { httpBasicAuth: string; body: string }) {
		const res = fetch('https://www.reddit.com/api/v1/access_token', {
			method: 'POST',
			headers: {
				Authorization: `Basic ${options.httpBasicAuth}`,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: options.body
		});

		return res;
	}

	static async fromUsernamePassword(options: {
		clientId: string;
		clientSecret: string;
		username: string;
		password: string;
	}) {
		const { clientId, clientSecret, username, password } = options;
		const body = `grant_type=password&username=${username}&password=${password}`;
		const res = await this.retrieveAccessToken({
			httpBasicAuth: Jsrwrap.encodeClientIdAndSecret(clientId, clientSecret),
			body
		});

		if (res.status !== 200) {
			throw new Error('Invalid credentials');
		}

		const resJson = (await res.json()) as accessTokenJsonResponse;

		return new Jsrwrap(resJson.access_token, clientId, clientSecret);
	}

	static createAuthUrl(options: {
		clientId: string;
		state: string;
		redirectUri: string;
		duration: 'temporary' | 'permanent';
		scope: Scope[];
	}): string {
		const { clientId, state, redirectUri, duration, scope } = options;
		let scopes = scope.join(' ');
		scopes = encodeURIComponent(scopes);
		return `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=code&state=${state}&redirect_uri=${redirectUri}&duration=${duration}&scope=${scopes}`;
	}

	/**
	 * Creates a Jsrwrap object with an access token after authenticating with Reddit through a code
	 *
	 * @param options.clientId - The Client ID generated by Reddit during app registration.
	 * @param options.clientSecret - The secret generated by Reddit during app registration.
	 * @param options.redirectUri - The redirect_uri specified during app registration.
	 * @param options.code - A one-time use code obtained from the redirect URI given after the user allows access to their Reddit account
	 * from the url created by {@link Jsrwrap.createAuthUrl}
	 *
	 * @returns A Jsrwrap object with a valid access token
	 *
	 * @throws {@link OAuthError}
	 * Thrown if an error occurs during the authentication process
	 */
	static async fromAuthCode(options: {
		clientId: string;
		clientSecret: string;
		redirectUri: string;
		code: string;
	}): Promise<Jsrwrap> {
		const { clientId, clientSecret, redirectUri, code } = options;
		const body = `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`;
		const res = await this.retrieveAccessToken({
			httpBasicAuth: Jsrwrap.encodeClientIdAndSecret(clientId, clientSecret),
			body
		});

		if (res.status !== 200) {
			if (res.status === 401) {
				throw new Error('Invalid clientId and clientSecret');
			}
			if (res.status === 400) {
				throw new Error('code is invalid');
			}
			throw new Error();
		}

		const resJson = (await res.json()) as any;
		if ('error' in resJson || 'message' in resJson) {
			throw new Error(`${resJson['message']}`);
		}

		return new Jsrwrap(
			(resJson as accessTokenJsonResponse).access_token,
			clientId,
			clientSecret,
			(resJson as accessTokenJsonResponse).refresh_token
		);
	}

	/**
	 * Creates a Jsrwrap object with an access token after authenticating with Reddit through Application Only OAuth
	 *
	 * @param options.clientId - The Client ID generated by Reddit during app registration.
	 * @param options.clientSecret - The secret generated by Reddit during app registration.
	 * @param options.grantType - One of `client_credentials` or `https://oauth.reddit.com/grants/installed_client`.
	 * When using `installed_client`, deviceId must also be passed in.
	 * Use `installed_client` for installed app types and use `client_credentials` for confidential app types (web app / script).
	 * @param options.deviceId - A unique, per-device ID. Required when using grantType=https://oauth.reddit.com/grants/installed_client. Must be between 20-30 characters.
	 *
	 * @returns A Jsrwrap object with a valid access token
	 *
	 * @throws {@link OAuthError}
	 * Thrown if an error occurs during the authentication process
	 */
	static async fromApplicationOnlyAuth(options: {
		clientId: string;
		clientSecret: string;
		grantType: 'client_credentials' | 'https://oauth.reddit.com/grants/installed_client';
		deviceId?: string;
	}) {
		const { clientId, clientSecret, grantType, deviceId } = options;
		let body = `grant_type=${grantType}`;

		if (grantType === 'https://oauth.reddit.com/grants/installed_client') {
			if (!deviceId) {
				throw new OAuthError('deviceId is required when using the installed_client grant');
			}
			if (deviceId.length < 20 || deviceId.length > 30) {
				throw new OAuthError('deviceId must be between 20-30 characters');
			}
			body = `${body}&device_id=${deviceId}`;
		}

		const res = await this.retrieveAccessToken({
			httpBasicAuth: Jsrwrap.encodeClientIdAndSecret(clientId, clientSecret),
			body
		});

		if (res.status !== 200) {
			// Reddit returns a 401 response when Authorization value is not valid
			throw new OAuthError('Invalid clientId or clientSecret');
		}

		const resJson = (await res.json()) as accessTokenJsonResponse;
		// console.log(resJson);
		return new Jsrwrap(resJson.access_token, clientId, clientSecret);
	}
}

export { Jsrwrap };
