import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./routes/home";
import SeniorDate from "./routes/seniordate";
import DataBaseView from "./routes/dataBaseView";
import DBAnalysis from "./routes/dBAnalysis";
import AddSoldier from "./routes/addSoldier";
import DataMatching from "./components/excel/dataMatching";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/senior-date" element={<SeniorDate />} />
      <Route path="/data-base-view" element={<DataBaseView />} />
      <Route path="/analysis" element={<DBAnalysis />} />
      <Route path="/add-soldier" element={<AddSoldier />} />
      <Route path="/data-matching" element={<DataMatching />} />
    </Routes>
  );
}

export default App;
