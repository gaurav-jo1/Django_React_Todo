import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';
import App from './App';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const client = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={client}>
    <App />
    {/* <ReactQueryDevtools/> */}
  </QueryClientProvider>
);