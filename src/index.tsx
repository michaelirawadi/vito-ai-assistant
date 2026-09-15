import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import "./pages/AI_Command_1.css";
import AICommand from "./pages/AI_Command_1";
import Home from "./pages/Home";
import reportWebVitals from "./reportWebVitals";

const About = () => <div>About</div>;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/AI_Command_1" element={<AICommand />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
