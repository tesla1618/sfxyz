import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AppRouter from "./AppRouter";
// import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
const navbar = ReactDOM.createRoot(document.getElementById("navbar"));

// reportWebVitals();
