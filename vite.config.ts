import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(({ mode }: { mode: string }) => ({
    css: { modules: { generateScopedName: mode === 'development' ? '' : '[hash:base64:8]' } },
    plugins: [vue()],
    resolve: {
        alias: {
            '@assets': path.resolve(__dirname, './src/assets'),
            '@components': path.resolve(__dirname, './src/component*'),
            '@shared': path.resolve(__dirname, './src/shared'),
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        proxy: {
            '/api': {
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/api/, ''),
                target: 'https://focusinfo.ru/access-board/api',
            },
        },
    },
    build: {
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: path.resolve(__dirname, './src/main.ts'),
            name: 'AccessBoard',
            // the proper extensions will be added
            fileName: 'vue-access-board',
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ['vue'],
            output: {
            // Provide global variables to use in the UMD build
            // for externalized deps
                globals: { vue: 'Vue' },
            },
        },
    },
}));
