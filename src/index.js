import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import { StoreProvider } from "easy-peasy";
// import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StoreProvider store={store}>
      
    </StoreProvider> */}
  </React.StrictMode>
);
