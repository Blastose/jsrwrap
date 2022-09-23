import fetch from 'node-fetch';

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

type OAuthConfig = {
	clientId: string;
	clientSecret: string;
	state: string;
	responseType: 'code' | 'token';
	redirectUri: string | null;
	duration: 'temporary' | 'permanent';
	scope: Scope[];
	grantType: 'authorization_code' | 'refresh_token';
	accessToken: string;
	refreshToken: string;
};

class Jsrwrap {
	accessToken: string;

	constructor(accessToken: string) {
		this.accessToken = accessToken;
	}

	static async fromUsernamePassword(
		clientId: string,
		clientSecret: string,
		username: string,
		password: string
	) {
		const clientIdAndSecret = Buffer.from(`${clientId}:${clientSecret}`);
		const base64EncodedClientIdAndSecret = clientIdAndSecret.toString('base64');

		const res = await fetch('https://www.reddit.com/api/v1/access_token', {
			method: 'POST',
			headers: {
				Authorization: `Basic ${base64EncodedClientIdAndSecret}`,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: `grant_type=password&username=${username}&password=${password}`
		});

		if (res.status !== 200) {
			throw new Error('Invalid credentials');
		}

		const resJson = (await res.json()) as accessTokenJsonResponse;

		return new Jsrwrap(resJson.access_token);
	}

	static createAuthUrl(
		clientId: string,
		state: string,
		redirectUri: string,
		duration: 'temporary' | 'permanent',
		scope: Scope[]
	): string {
		let scopes = scope.join(' ');
		scopes = encodeURIComponent(scopes);
		return `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=code&state=${state}&redirect_uri=${redirectUri}&duration=${duration}&scope=${scopes}`;
	}

	static async fromAuthCode(
		clientId: string,
		clientSecret: string,
		redirectUri: string,
		code: string
	): Promise<Jsrwrap> {
		const clientIdAndSecret = Buffer.from(`${clientId}:${clientSecret}`);
		const base64EncodedClientIdAndSecret = clientIdAndSecret.toString('base64');

		const res = await fetch('https://www.reddit.com/api/v1/access_token', {
			method: 'POST',
			headers: {
				Authorization: `Basic ${base64EncodedClientIdAndSecret}`,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`
		});

		if (res.status !== 200) {
			throw new Error('Invalid credentials');
		}

		const resJson = (await res.json()) as accessTokenJsonResponse;

		return new Jsrwrap(resJson.access_token);
	}

	static async fromApplicationOnlyAuth(
		clientId: string,
		clientSecret: string,
		grantType: 'client_credentials' | 'https://oauth.reddit.com/grants/installed_client',
		deviceId?: string
	) {
		const clientIdAndSecret = Buffer.from(`${clientId}:${clientSecret}`);
		const base64EncodedClientIdAndSecret = clientIdAndSecret.toString('base64');

		let body = `grant_type=${grantType}`;

		if (grantType === 'https://oauth.reddit.com/grants/installed_client') {
			if (!deviceId) {
				throw new Error('deviceId is required when using the installed_client grant');
			}
			body = `${body}&device_id=${deviceId}`;
		}

		const res = await fetch('https://www.reddit.com/api/v1/access_token', {
			method: 'POST',
			headers: {
				Authorization: `Basic ${base64EncodedClientIdAndSecret}`,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: body
		});

		if (res.status !== 200) {
			throw new Error('Invalid credentials');
		}

		const resJson = (await res.json()) as accessTokenJsonResponse;
		console.log(resJson);
		return new Jsrwrap(resJson.access_token);
	}
}

export { Jsrwrap };
