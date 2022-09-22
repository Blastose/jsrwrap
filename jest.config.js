/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: 'ts-jest/presets/js-with-ts-esm',
	testEnvironment: 'node',
	transformIgnorePatterns: [
		'node_modules/(?!(node-fetch|data-uri-to-buffer|fetch-blob|formdata-polyfill)/)'
	]
};
