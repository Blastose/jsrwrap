import { Jsrwrap } from 'jsrwarp';

export class Comment {
	private _reddit: Jsrwrap;

	constructor(_reddit: Jsrwrap, public comment: string) {
		this._reddit = _reddit;
	}
}
