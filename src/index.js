import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from "axios";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Redirect API calls from localhost to the hosted backend URL if configured
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
axios.interceptors.request.use(
  (config) => {
    if (config.url && config.url.startsWith("http://localhost:5000")) {
      config.url = config.url.replace("http://localhost:5000", API_BASE_URL);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
