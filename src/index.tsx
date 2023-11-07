import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { Provider } from "react-redux";
import store from "./store";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
