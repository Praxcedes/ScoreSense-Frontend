import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { PointsProvider } from "./context/PointsContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <App
      routerConfig={{
        future: {
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }
      }}
    />
  </React.StrictMode>
)

