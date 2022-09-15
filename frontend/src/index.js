import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { QueryClientProvider } from '@tanstack/react-query';
import App from './App';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import client from './react-query-client';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={client}>
    <App />
    {/* <ReactQueryDevtools/> */}
  </QueryClientProvider>
);