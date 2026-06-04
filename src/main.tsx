import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { initializeGA } from './lib/analytics';
import { initializeClarity } from './lib/clarity';
import './index.css';

initializeGA();
initializeClarity();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
