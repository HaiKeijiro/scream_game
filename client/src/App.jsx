import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Scream from "./Scream";
import Register from "./Register";
import TestScream from "./TestScream";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/scream" element={<Scream />} />
      <Route path="/test-scream" element={<TestScream />} />
    </Routes>
  );
}

export default App;
