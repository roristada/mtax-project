"use client";
import React from "react";
import Header from "./components/Header";
import About from "./components/About";
import Services from "./components/Services";
import Navbar from "./components/Navbar";



import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

interface User {
  id: number;
  email: string;
  role: string;
  exp: string;
}

const Home = () => {
  const token = Cookies.get("token");
  const route = useRouter();
  useEffect(() => {
    
    if (token) {
      try {
        const decoded: User = jwt_decode(token);
        const isExpired = Date.parse(decoded.exp) < Date.now();
        
        console.log(decoded);
        if (isExpired) {
          Cookies.remove("token");
          route.push("/login");
        } 
      } catch (error) {
        // If token is invalid or expired
        console.error("Invalid token:", error);
        route.push("/login"); // Redirect to login page
      }
    }
  }, [route,token]);

  return (
    <main className=" w-full mx-auto">
      <Navbar />
      <Header />
      <About />
      <Services/>
      <Contact/>
      <Footer/>
    </main>
  );
};

export default Home;
