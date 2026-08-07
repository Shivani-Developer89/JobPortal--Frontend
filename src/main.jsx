import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(

    <StrictMode>

        <AuthProvider>

            <App />

            <ToastContainer
                position="top-right"
                autoClose={3000}
                newestOnTop
                pauseOnHover
                theme="colored"
            />

        </AuthProvider>

    </StrictMode>

);