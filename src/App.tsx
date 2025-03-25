import "./App.css";
import {  Routes, Route } from "react-router";
import Home from "./routes/home";
import SeniorDate from "./routes/seniordate";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/senior-date" element={<SeniorDate />} />
      </Routes>
  );
}

export default App;
