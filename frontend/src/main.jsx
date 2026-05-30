import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        toastOptions={{
          duration: 2000,
        }}
      />
    </BrowserRouter>
  </StrictMode>,
);

import { registerSW } from "virtual:pwa-register";

if ("serviceWorker" in navigator) {
  registerSW({ immediate: true });
}
