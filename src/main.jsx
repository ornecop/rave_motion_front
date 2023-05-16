import React from "react";
import ReactDOM from "react-dom/client";

// App
import App from "./App";

// Main CSS
import "./index.css";

// React router dom
import { BrowserRouter } from "react-router-dom";

// React Redux
import { Provider } from "react-redux";
import store from "./redux/store";

// Google OAuth
import { GoogleOAuthProvider } from "@react-oauth/google";
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <React.StrictMode>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </React.StrictMode>
        </GoogleOAuthProvider>
    </Provider>
);
