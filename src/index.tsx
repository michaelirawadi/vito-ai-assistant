import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import "./pages/AI_Command.css";
import AICommand from "./pages/AI_Command_1";
import AICommand2 from "./pages/AI_Command_2";
import AICommand3 from "./pages/AI_Command_3";
import AICommand4 from "./pages/AI_Command_4";
import Home from "./pages/Home_1";
import Home2 from "./pages/Home_2";
import Home3 from "./pages/Home_3";
import Home4 from "./pages/Home_4";
import reportWebVitals from "./reportWebVitals";

const About = () => <div>About</div>;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Home_2" element={<Home2 />} />
      <Route path="/Home_3" element={<Home3 />} />
      <Route path="/Home_4" element={<Home4 />} />
      <Route path="/qris" element={null} />
      <Route path="/AI_Command_1" element={<AICommand />} />
      <Route path="/AI_Command_2" element={<AICommand2 />} />
      <Route path="/AI_Command_3" element={<AICommand3 />} />
      <Route path="/AI_Command_4" element={<AICommand4 />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
