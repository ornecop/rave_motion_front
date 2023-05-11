import React from "react";
import ReactDOM from "react-dom/client";

// App
import { App } from "./App";

// Main CSS
import "./index.css";

// React router dom
import { BrowserRouter } from "react-router-dom";

// ======================== React Redux
import { Provider } from "react-redux";
import store from "./redux/store";

// Google OAuth
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId="304343013242-6qim8t96pm35vpum87e0saa58sfomrt3.apps.googleusercontent.com">
            <React.StrictMode>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </React.StrictMode>
        </GoogleOAuthProvider>
    </Provider>
);
