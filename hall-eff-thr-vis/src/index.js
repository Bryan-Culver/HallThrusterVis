import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
// site theme (dark, NASA-style); must load after Bootstrap so it can override it
import './theme.css';

createRoot(document.getElementById('app')).render(<App/>);
