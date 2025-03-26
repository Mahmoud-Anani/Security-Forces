import "./App.css";
import {  Routes, Route } from "react-router";
import Home from "./routes/home";
import SeniorDate from "./routes/seniordate";
import DataBaseView from "./routes/dataBaseView";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/senior-date" element={<SeniorDate />} />
      <Route path="/DataBaseView" element={<DataBaseView />} />
    </Routes>
  );
}

export default App;
