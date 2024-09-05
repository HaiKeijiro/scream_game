import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Scream from "./pages/Scream";
import Register from "./pages/Register";
import ExportPage from "./pages/ExportPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/scream" element={<Scream />} />
      <Route path="/export" element={<ExportPage />}></Route>
      <Route path="/admin" element={<AdminPage />}></Route>
    </Routes>
  );
}

export default App;
