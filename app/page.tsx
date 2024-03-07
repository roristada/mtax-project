"use client";
import React from "react";
import Header from "./components/Header";
import About from "./components/About";
import Services from "./components/Services";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Ourteam from "./components/OurTeam";

const Home = () => {
  return (
    <main className=" w-[90%] mx-auto">
      <Header/>
      <About/>
      <Services/>
      <Ourteam/>
      <Contact/>
      <Footer/>
    </main>
  );
};

export default Home;
