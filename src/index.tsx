import React from "react";
import App from "./App/App";
import { createRoot } from "react-dom/client";
import "./styles.scss";
import "@shared/i18n/setup";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
