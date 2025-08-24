import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routers';
import { AppErrorBoundary } from './components/ErrorBoundary';
import { AppLoading } from './components/Loading';
import './styles/index.css';

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <AppErrorBoundary>
      <Suspense fallback={<AppLoading />}>
        <RouterProvider router={router} />
      </Suspense>
    </AppErrorBoundary>
  </React.StrictMode>
);

