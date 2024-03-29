import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		coverage: {
			reporter: ['text', 'lcov', 'html'],
			provider: 'c8'
		},
		setupFiles: ['dotenv/config']
	}
});
