// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { MochiPlaceholder } from './components/MochiPlaceholder';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div style={{ width: '100vw', height: '100vh', background: 'transparent' }}>
      <MochiPlaceholder />
    </div>
  </React.StrictMode>,
);