import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import '../src/pages/index.css'; //тут шрифт для всего сделан, плюс сброс margin и padding
import App from '../src/pages/App/App'; //тут логика переходов

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/*' element={<App />} />
    </Routes>
  </BrowserRouter>
);
