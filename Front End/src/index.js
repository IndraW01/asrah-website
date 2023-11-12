import React from "react";
import ReactDOM from "react-dom/client";

import "./assets/style/style_layouts/global.css";
import "./assets/style/style_component/button.css";

import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

import App from "./App";





const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
