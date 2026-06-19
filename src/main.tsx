import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* HashRouter：刷新不 404，零服务器配置，适配 GitHub Pages / Vercel / Netlify */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);
