import React from "react";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupHostelOwner from "./Components/SignupHostelOwner";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
          <Route path="Login" element={<Login />} />
          <Route path="Signup" element={<Signup />} />
          <Route path="SignupHostelOwner" element={<SignupHostelOwner />} />
          
      </Routes>
    </BrowserRouter>
  );
}

export default App;
