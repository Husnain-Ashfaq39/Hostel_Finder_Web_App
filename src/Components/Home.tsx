import React from "react";
import Navbar from "../HomeComponents/Navbar";
import HeroSection from "../HomeComponents/HeroSection";
import Card from "../HomeComponents/Card";
function Home() {
  return (
    <>
      <Navbar></Navbar>
      <HeroSection />
      {/* card Container */}
      <div className=" p-20 m-10 grid gap-4 grid-cols-3 grid-rows-3">

      <Card />
      <Card />
      <Card />

      <Card />
      <Card />
      <Card />

      
     
      
      </div>
    </>
  );
}

export default Home;
