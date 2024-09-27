import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import GridApp from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GridApp />
  </React.StrictMode>
);
