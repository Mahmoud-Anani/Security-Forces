import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./routes/home";
import SeniorDate from "./routes/seniordate";
import DataBaseView from "./routes/dataBaseView";
import DBAnalysis from "./routes/dBAnalysis";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/senior-date" element={<SeniorDate />} />
      <Route path="/data-base-view" element={<DataBaseView />} />
      <Route path="/analysis" element={<DBAnalysis />} />
    </Routes>
  );
}

export default App;
