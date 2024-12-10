import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
 import Home from "./pages/Home";
 import Userid from "./pages/userid";

  

function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/home" element={<Home />} />
         <Route path="/userid" element={<Userid />} />

        
      </Routes>
    </Router>
  );
}

export default App;
