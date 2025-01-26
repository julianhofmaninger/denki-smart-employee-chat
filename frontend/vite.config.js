import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [react()],
    assetsInclude: ['**/*.lottie'],
    define: {
        'process.env': {}
    },
    server: {
        watch: {
            usePolling: true,
        },
        host: true,
        strictPort: true,
        port: 3000,
    }
});
