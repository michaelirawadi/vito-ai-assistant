import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import "./pages/Feature1/AI_Command.css";
import AICommand from "./pages/Feature1/AI_Command_1";
import AICommand2 from "./pages/Feature1/AI_Command_2";
import AICommand3 from "./pages/Feature1/AI_Command_3";
import AICommand4 from "./pages/Feature1/AI_Command_4";
import Feature1_1 from "./pages/Feature1/Feature1_1";
import Feature1_2 from "./pages/Feature1/Feature1_2";
import Feature1_3 from "./pages/Feature1/Feature1_3";
import Feature1_4 from "./pages/Feature1/Feature1_4";
import AICommand2_1 from "./pages/Feature2/AI_Command2_1";
import AICommand2_2 from "./pages/Feature2/AI_Command2_2";
import AICommand2_3 from "./pages/Feature2/AI_Command2_3";
import Feature2_1 from "./pages/Feature2/Feature2_1";
import Feature2_2 from "./pages/Feature2/Feature2_2";
import Feature2_3 from "./pages/Feature2/Feature2_3";
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
      <Route path="/Feature1_1" element={<Feature1_1 />} />
      <Route path="/Feature1_2" element={<Feature1_2 />} />
      <Route path="/Feature1_3" element={<Feature1_3 />} />
      <Route path="/Feature1_4" element={<Feature1_4 />} />
      <Route path="/AI_Command_1" element={<AICommand />} />
      <Route path="/AI_Command_2" element={<AICommand2 />} />
      <Route path="/AI_Command_3" element={<AICommand3 />} />
      <Route path="/AI_Command_4" element={<AICommand4 />} />
      <Route path="/Feature2_1" element={<Feature2_1 />} />
      <Route path="/Feature2_2" element={<Feature2_2 />} />
      <Route path="/Feature2_3" element={<Feature2_3 />} />
      <Route path="/AI_Command2_1" element={<AICommand2_1 />} />
      <Route path="/AI_Command2_2" element={<AICommand2_2 />} />
      <Route path="/AI_Command2_3" element={<AICommand2_3 />} />
    </Routes>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
