/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Jsrwrap } from '../src/jsrwarp/index';

describe('Jsrwrap static methods', () => {
	it('should generate a valid authorization URL', () => {
		expect(
			Jsrwrap.createAuthUrl(
				'T_OJ428Xl6SYT52iyI8VKA',
				'state_123',
				'http://localhost:5173',
				'permanent',
				['edit', 'history']
			)
		).toBe(
			'https://www.reddit.com/api/v1/authorize?client_id=T_OJ428Xl6SYT52iyI8VKA&response_type=code&state=state_123&redirect_uri=http://localhost:5173&duration=permanent&scope=edit%20history'
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

	test('reddit returns a JSON with an access token when authenticating with username and password for a script app', async () => {
		const reddit = await Jsrwrap.fromUsernamePassword(
			process.env.SCRIPT_CLIENT_ID!,
			process.env.SCRIPT_CLIENT_SECRET!,
			process.env.USERNAME!,
			process.env.PASSWORD!
		);
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
});
