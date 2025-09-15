// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { VehicleProvider } from "./context/VehicleContext"; // ✅ import provider

ReactDOM.createRoot(document.getElementById("root")).render(
  <VehicleProvider>
    <App />
  </VehicleProvider>
);