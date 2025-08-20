import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import App from './pages/App';
import LayoutDemo from './pages/LayoutDemo';
import './styles.css';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/layout" element={<LayoutDemo />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

