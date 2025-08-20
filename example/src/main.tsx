import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './pages/App';
import LayoutDemo from './pages/LayoutDemo';
import GridDemo from './pages/GridDemo';
import GridConfigDemo from './pages/GridConfigDemo';
import FlexDemo from './pages/FlexDemo';
import CssGridDemo from './pages/CssGridDemo';
import ContainerDemo from './pages/ContainerDemo';
import './styles.css';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/layout" element={<LayoutDemo />} />
        <Route path="/grid" element={<GridDemo />} />
        <Route path="/grid-config" element={<GridConfigDemo />} />
        <Route path="/flex" element={<FlexDemo />} />
        <Route path="/css-grid" element={<CssGridDemo />} />
        <Route path="/container" element={<ContainerDemo />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

