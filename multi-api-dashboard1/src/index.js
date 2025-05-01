import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // ✅ Import QueryClient and QueryClientProvider

// Create a QueryClient instance
const queryClient = new QueryClient();

// Create the root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app with QueryClientProvider and HashRouter
root.render(
  <QueryClientProvider client={queryClient}> {/* ✅ Wrap your app with QueryClientProvider */}
    <HashRouter> {/* ✅ Enable React Router */}
      <App />
    </HashRouter>
  </QueryClientProvider>
);
