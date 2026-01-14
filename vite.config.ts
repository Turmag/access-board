import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(({ mode }: { mode: string }) => ({
    css: { modules: { generateScopedName: mode === 'development' ? '' : '[hash:base64:8]' } },
    // INFO: Для теста
    // base: '/access-board',
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
            entry: path.resolve(__dirname, './src/main.ts'),
            name: 'AccessBoard',
            fileName: 'vue-access-board',
        },
        rollupOptions: {
            external: ['vue'],
            output: { globals: { vue: 'Vue' } },
        },
    },
}));
