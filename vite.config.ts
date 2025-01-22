import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(({ mode }: { mode: string }) => ({
    base: '/access-board/',
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
}));
