import React from 'react'
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


createRoot(document.getElementById('root')).render(
<React.StrictMode>
          <App />

        <ToastContainer
            position="top-right"
            autoClose={3000}
            theme="colored"
            newestOnTop
            pauseOnHover
        />
</React.StrictMode>
)
