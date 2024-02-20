"use client";
import React from "react";
import Header from "./components/Header";
import About from "./components/About";
import Services from "./components/Services";
import Navbar from "./components/Navbar";

const Home = () => {
  return (
    <main className=" w-[90%] mx-auto">
      
      <Header />
      <About />
      <Services/>
    </main>
  );
};

export default Home;
