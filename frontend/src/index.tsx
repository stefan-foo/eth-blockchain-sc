import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { EthersStateProvider } from "./contexts/ethers.context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <EthersStateProvider>
      <App />
    </EthersStateProvider>
  </React.StrictMode>
);

reportWebVitals();
