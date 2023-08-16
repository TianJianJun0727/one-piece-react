import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_BASE_URL } = env;
  return {
    base: VITE_BASE_URL,
    build: {
      target: 'ESNext',
    },
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
    ],
    resolve: {
      alias: {
        '@rickzhou/react-playground': path.resolve(__dirname, './src'),
      },
    },
  };
});