import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './pages/App';
import TechLayoutDemo from './pages/TechLayoutDemo';
import './styles.css';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/demo" element={<TechLayoutDemo />} />
        {/* 兼容旧路径 */}
        <Route path="/tech-layout" element={<TechLayoutDemo />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

