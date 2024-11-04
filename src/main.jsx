// Import necessary libraries and main application components
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import global styles (if any) and Bootstrap for styling
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Get the root DOM element where the app will be rendered
const rootElement = document.getElementById('root');

// Create a root and render the App component
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
