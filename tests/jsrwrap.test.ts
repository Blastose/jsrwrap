/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Jsrwrap } from '../src/jsrwarp/index';

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
		const reddit = await Jsrwrap.fromAuthCode(
			process.env.CLIENT_ID!,
			process.env.CLIENT_SECRET!,
			'http://localhost:5173',
			'flAqmMMLowCKKagZLMRR72yJcs7rrg'
		);
		expect(reddit).toBeInstanceOf(Jsrwrap);
	});

	test('reddit returns an error when authenticating with invalid code', async () => {
		await expect(
			Jsrwrap.fromAuthCode(
				process.env.CLIENT_ID!,
				process.env.CLIENT_SECRET!,
				'http://localhost:5173',
				'flAqmMMLowCKKagZLMRR72yJcs7rrg'
			)
		).rejects.toThrow(Error);
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

	test('reddit returns a JSON with an access token when authenticating with application only OAuth and client_credentials', async () => {
		const reddit = await Jsrwrap.fromApplicationOnlyAuth(
			process.env.CLIENT_ID!,
			process.env.CLIENT_SECRET!,
			'client_credentials'
		);
		expect(reddit).toBeInstanceOf(Jsrwrap);
	});

	test('reddit returns a JSON with an access token when authenticating with application only OAuth and installed_client', async () => {
		const reddit = await Jsrwrap.fromApplicationOnlyAuth(
			process.env.CLIENT_ID!,
			process.env.CLIENT_SECRET!,
			'https://oauth.reddit.com/grants/installed_client',
			'bxkbocifqjjxjbdamkfq'
		);
		expect(reddit).toBeInstanceOf(Jsrwrap);
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
