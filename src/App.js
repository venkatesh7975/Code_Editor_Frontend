import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import FormFields from "./components/FormFields/FormFields";
import SubmittedEntries from "./components/SubmittedEntries/SubmittedEntries";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/FormFields" element={<FormFields />} />
        <Route exact path="/Entries" element={<SubmittedEntries />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
