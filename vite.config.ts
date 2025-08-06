import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

let httpsConfig: { key: any; cert: any; };

export default defineConfig(async ({ mode }) => {
	const isDev = mode === 'development'

	if (isDev) {
		httpsConfig = (await import('./cert.js')).httpsConfig
	}
	
	return {
		plugins: [tailwindcss(), sveltekit()],
		server: isDev ? {
			https: httpsConfig,
			host: 'localhost',
			port: 5173
		}
		: {}
	}
});
