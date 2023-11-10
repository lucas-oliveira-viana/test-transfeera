import React from "react";
import App from "./App/App";
import { createRoot } from "react-dom/client";
import "./styles.scss";
import "@shared/i18n/setup";
import { Provider } from "react-redux";
import store from "@core/redux/store";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
