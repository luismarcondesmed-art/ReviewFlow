import './styles.css';
import { UpdatePrompt } from './components/UpdatePrompt';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
    <UpdatePrompt />
    <Analytics />
    <SpeedInsights />
  </React.StrictMode>
);