import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { WebRTCProvider } from './context/WebRTCContext';

ReactDOM.render(
  <React.StrictMode>
    <WebRTCProvider>
      <App />
    </WebRTCProvider>
  </React.StrictMode>,
  document.getElementById('root')
);