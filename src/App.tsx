import React from "react";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupHostelOwner from "./Components/SignupHostelOwner";
import OwnerPage from "./Components/OwnerPage";
import AddHostel from "./OwnerPageComponents/AddHostel";
import PopupModal from "./Components/PopupModel";
import FetchImage from "./Components/FetchImage";
import { useMyContext } from "./context/MyContext";
import { Booking } from "./Components/Booking";

function App() {
  const {owner}=useMyContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
          <Route path="Login" element={<Login />} />
          <Route path="Signup" element={<Signup />} />
          <Route path="SignupHostelOwner" element={<SignupHostelOwner />} />
          <Route path="ownerpage" element={<OwnerPage />} />
          <Route path="addhostel" element={<AddHostel hostelOwnerId={(owner.id)}/>} />
          <Route path="popmodel" element={<PopupModal/>} />
          <Route path="fetchimage" element={<FetchImage/>} />
          <Route path="booking" element={<Booking/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
