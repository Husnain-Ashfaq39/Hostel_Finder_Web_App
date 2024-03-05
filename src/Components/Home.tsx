import React from "react";
import Navbar from "../HomeComponents/Navbar";
import HeroSection from "../HomeComponents/HeroSection";
import Card from "../HomeComponents/Card";
import FilterOption from "../HomeComponents/FilterOption";

function Home() {
  return (
    <>
      <Navbar></Navbar>
      <HeroSection />
      {/* Filter Options */}
      <div className="flex justify-center p-5">
      <FilterOption />

      </div>
      {/* card Container */}
      <div className=" p-20 m-10 grid gap-10 gap-x-15 grid-cols-3 grid-rows-3">

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
