import React from "react";
import ReactDOM from "react-dom/client";

// App
import { App } from "./App";

// Main CSS
import "./index.css";

// React router dom
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
