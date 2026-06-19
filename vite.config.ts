import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 使用相对 base，兼容 GitHub Pages 子路径 / Vercel / Netlify 根路径部署。
// 路由使用 HashRouter，避免刷新 404，无需服务器重写规则。
export default defineConfig({
  base: './',
  plugins: [react()],
});
