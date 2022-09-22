import { Greeter } from '../src/index';

test('greets bob', () => {
	expect(Greeter('bob')).toBe('hello bob');
});
