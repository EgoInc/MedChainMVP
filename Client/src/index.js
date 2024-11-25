import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import "../src/pages/index.css"; //тут шрифт для всего сделан, плюс сброс margin и padding
import App from "./App";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
  </BrowserRouter>
);
