import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createAppStore } from "./app/store";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import App from "./app/app";
import "./styles/index.scss";

const store = createAppStore();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <HelmetProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </HelmetProvider>
        </Provider>
    </React.StrictMode>
);
