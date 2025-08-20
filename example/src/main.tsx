import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './pages/App';
import TechLayoutDemo from './pages/tech/TechLayoutDemo';
import Dashboard from './pages/tech/Dashboard';
import Docs from './pages/tech/Docs';
import About from './pages/tech/About';
import './styles.css';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<TechLayoutDemo />}>
          <Route index element={<Dashboard />} />
          <Route path="docs" element={<Docs />} />
          <Route path="docs/api" element={<Docs />} />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="/welcome" element={<App />} />
        {/* 兼容旧路径 */}
        <Route path="/demo" element={<TechLayoutDemo />} />
        <Route path="/tech-layout" element={<TechLayoutDemo />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

