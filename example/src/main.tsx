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
import MenuDemo from './pages/MenuDemo';
import HeaderDemo from './pages/HeaderDemo';
import SidebarDemo from './pages/SidebarDemo';
import SearchDemo from './pages/SearchDemo';
import AppLayoutDemo from './pages/AppLayoutDemo';
import TechLayoutDemo from './pages/TechLayoutDemo';
import './styles.css';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/layout" element={<LayoutDemo />} />
        <Route path="/grid" element={<GridDemo />} />
        <Route path="/grid-config" element={<GridConfigDemo />} />
        <Route path="/flex" element={<FlexDemo />} />
        <Route path="/css-grid" element={<CssGridDemo />} />
        <Route path="/container" element={<ContainerDemo />} />
        <Route path="/menu" element={<MenuDemo />} />
        <Route path="/header" element={<HeaderDemo />} />
        <Route path="/sidebar" element={<SidebarDemo />} />
        <Route path="/search" element={<SearchDemo />} />
        <Route path="/app-layout" element={<AppLayoutDemo />} />
        <Route path="/tech-layout" element={<TechLayoutDemo />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

