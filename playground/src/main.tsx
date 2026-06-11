import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@manti-ui/styles/index.css';

import { App } from './App';
import './app.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Playground root element was not found.');
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
