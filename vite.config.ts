import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      proxy: {
        '/v1/chat/completions': {
          target: 'https://integrate.api.nvidia.com',
          changeOrigin: true,
          headers: {
            'Authorization': `Bearer ${env.VITE_NVIDIA_NIM_API_KEY}`,
          },
          onProxyReq(proxyReq, req, res) {
            console.log('[Proxy] outgoing request to', proxyReq.path);
          },
          onError(err, req, res) {
            console.error('[Proxy] error:', err.message);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Proxy error: ' + err.message);
          },
          onProxyRes(proxyRes, req, res) {
            console.log('[Proxy] response status:', proxyRes.statusCode);
          }
        },
      },
    },
  };
});
