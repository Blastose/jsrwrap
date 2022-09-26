/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Jsrwrap } from '../src/jsrwarp/index';
import OAuthError from '../src/jsrwarp/oauthError';

describe('Jsrwrap static methods', () => {
	it('should generate a valid authorization URL', () => {
		expect(
			Jsrwrap.createAuthUrl({
				clientId: 'T_OJ428Xl6SYT52iyI8VKA',
				state: 'state_123',
				redirectUri: 'http://localhost:5173',
				duration: 'permanent',
				scope: ['read', 'edit', 'history']
			})
		).toBe(
			'https://www.reddit.com/api/v1/authorize?client_id=T_OJ428Xl6SYT52iyI8VKA&response_type=code&state=state_123&redirect_uri=http://localhost:5173&duration=permanent&scope=read%20edit%20history'
		);
	});

	it('should encode the clientId and clientSecret', () => {
		expect(Jsrwrap.encodeClientIdAndSecret('6779ef20e75817b79602', 'asekldjlmascnekjnn_3jdk')).toBe(
			'Njc3OWVmMjBlNzU4MTdiNzk2MDI6YXNla2xkamxtYXNjbmVram5uXzNqZGs='
		);
	});
});

describe('Jsrwrap token retrieval', () => {
	// Code is one-time use so repeated calls to this test should fail
	// You can get a code from the above link and extracting the code from the query param
	test.skip('reddit returns a JSON with an access token when authenticating with code', async () => {
		const reddit = await Jsrwrap.fromAuthCode({
			clientId: process.env.CLIENT_ID!,
			clientSecret: process.env.CLIENT_SECRET!,
			redirectUri: 'http://localhost:5173',
			code: 'flAqmMMLowCKKagZLMRR72yJcs7rrg'
		});
		expect(reddit).toBeInstanceOf(Jsrwrap);
	});

	// Code needs to be valid for this test to pass, since Reddit api checks for a valid redirect_uri after it checks the code
	// You can get a code from the above link and extracting the code from the query param
	it.skip('should throw an error when redirectUri does not match when authenticating with code', async () => {
		await expect(
			Jsrwrap.fromAuthCode({
				clientId: process.env.CLIENT_ID!,
				clientSecret: process.env.CLIENT_SECRET!,
				redirectUri: 'http://notlocalhost:1234',
				code: 'flAqmMMLowCKKagZLMRR72yJcs7rrg'
			})
		).rejects.toThrow('redirectUri does not match the one registered to your app');
	});

	it('should throw an error when clientId or clientSecret is invalid when authenticating with code', async () => {
		await expect(
			Jsrwrap.fromAuthCode({
				clientId: 'notvalidclientid',
				clientSecret: process.env.CLIENT_SECRET!,
				redirectUri: 'http://localhost:5173',
				code: 'flAqmMMLowCKKagZLMRR72yJcs7rrg'
			})
		).rejects.toThrow('Invalid clientId or clientSecret');
	});

	it('should throw an error when authenticating with invalid code', async () => {
		await expect(
			Jsrwrap.fromAuthCode({
				clientId: process.env.CLIENT_ID!,
				clientSecret: process.env.CLIENT_SECRET!,
				redirectUri: 'http://localhost:5173',
				code: 'flAqmMMLowCKKagZLMRR72yJcs7rrg'
			})
		).rejects.toThrow('The code is expired or has already been used');
	});

	test('reddit returns a JSON with an access token when authenticating with username and password for a script app', async () => {
		const reddit = await Jsrwrap.fromUsernamePassword({
			clientId: process.env.SCRIPT_CLIENT_ID!,
			clientSecret: process.env.SCRIPT_CLIENT_SECRET!,
			username: process.env.USERNAME!,
			password: process.env.PASSWORD!
		});
		expect(reddit).toBeInstanceOf(Jsrwrap);
	});

	it('should throw an error when clientId or clientSecret is invalid when authenticating with username and password for a script app', async () => {
		await expect(
			Jsrwrap.fromUsernamePassword({
				clientId: 'notvalidclientid',
				clientSecret: process.env.SCRIPT_CLIENT_SECRET!,
				username: process.env.USERNAME!,
				password: process.env.PASSWORD!
			})
		).rejects.toThrow('Invalid clientId or clientSecret');
	});

	it('should throw an error when authenticating with username and password for a non-script app', async () => {
		await expect(
			Jsrwrap.fromUsernamePassword({
				clientId: process.env.CLIENT_ID!,
				clientSecret: process.env.CLIENT_SECRET!,
				username: process.env.USERNAME!,
				password: process.env.PASSWORD!
			})
		).rejects.toThrow('Only script apps may use password auth');
	});

	it('should throw an error when authenticating with incorrect username and password for a script app', async () => {
		await expect(
			Jsrwrap.fromUsernamePassword({
				clientId: process.env.SCRIPT_CLIENT_ID!,
				clientSecret: process.env.SCRIPT_CLIENT_SECRET!,
				username: 'fakeusernamehere',
				password: 'fakepasswordhere'
			})
		).rejects.toThrow(
			'Username or password does not match the account used to register the app with the given clientId and clientSecret'
		);
	});

	test('reddit returns a JSON with an access token when authenticating with application only OAuth and client_credentials', async () => {
		const reddit = await Jsrwrap.fromApplicationOnlyAuth({
			clientId: process.env.CLIENT_ID!,
			clientSecret: process.env.CLIENT_SECRET!,
			grantType: 'client_credentials'
		});
		expect(reddit).toBeInstanceOf(Jsrwrap);
	});

	it('should throw an error when clientId or clientSecret is invalid for application only OAuth and client_credentials', async () => {
		await expect(
			Jsrwrap.fromApplicationOnlyAuth({
				clientId: 'jajsleij3kjkajds',
				clientSecret: process.env.CLIENT_SECRET!,
				grantType: 'https://oauth.reddit.com/grants/installed_client'
			})
		).rejects.toThrow(OAuthError);
	});

	test('reddit returns a JSON with an access token when authenticating with application only OAuth and installed_client', async () => {
		const reddit = await Jsrwrap.fromApplicationOnlyAuth({
			clientId: process.env.CLIENT_ID!,
			clientSecret: process.env.CLIENT_SECRET!,
			grantType: 'https://oauth.reddit.com/grants/installed_client',
			deviceId: 'bxkbocifqjjxjbdamkfq'
		});
		expect(reddit).toBeInstanceOf(Jsrwrap);
	});

	it('should throw an error when clientId or clientSecret is invalid for application only OAuth and installed_client', async () => {
		await expect(
			Jsrwrap.fromApplicationOnlyAuth({
				clientId: 'jajsleij3kjkajds',
				clientSecret: process.env.CLIENT_SECRET!,
				grantType: 'https://oauth.reddit.com/grants/installed_client',
				deviceId: 'bxkbocifqjjxjbdamkfq'
			})
		).rejects.toThrow('Invalid clientId or clientSecret');
	});

	it('should throw an error when deviceId is not given for application only OAuth and installed_client', async () => {
		await expect(
			Jsrwrap.fromApplicationOnlyAuth({
				clientId: process.env.CLIENT_ID!,
				clientSecret: process.env.CLIENT_SECRET!,
				grantType: 'https://oauth.reddit.com/grants/installed_client'
			})
		).rejects.toThrow('deviceId is required when using the installed_client grant');
	});

	it('should throw an error when deviceId is less than 20 characters for application only OAuth and installed_client', async () => {
		await expect(
			Jsrwrap.fromApplicationOnlyAuth({
				clientId: process.env.CLIENT_ID!,
				clientSecret: process.env.CLIENT_SECRET!,
				grantType: 'https://oauth.reddit.com/grants/installed_client',
				deviceId: 'sadjfkj'
			})
		).rejects.toThrow('deviceId must be between 20-30 characters');
	});

	it('should throw an error when deviceId is greater than 30 characters for application only OAuth and installed_client', async () => {
		await expect(
			Jsrwrap.fromApplicationOnlyAuth({
				clientId: process.env.CLIENT_ID!,
				clientSecret: process.env.CLIENT_SECRET!,
				grantType: 'https://oauth.reddit.com/grants/installed_client',
				deviceId: 'sadjfkjasledjleksjadlkjseidjalskedjkasjkdjsdejdkjkdkjslj'
			})
		).rejects.toThrow('deviceId must be between 20-30 characters');
	});

	it('refreshes the access token for non-application only OAuth', async () => {
		const reddit = new Jsrwrap(
			process.env.ACCESS_TOKEN!,
			process.env.CLIENT_ID!,
			process.env.CLIENT_SECRET!,
			process.env.REFRESH_TOKEN!
		);
		await expect(reddit.refreshAccessToken()).resolves.not.toThrow(Error);
	});
});