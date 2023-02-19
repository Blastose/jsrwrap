export default class OAuthError extends Error {
	constructor(errorMessage: ErrorMessage) {
		super(errorMessage);
		this.name = 'OAuthError';
	}
}

type ErrorMessage = string;
