"use client";

import Footer from "@/components/Footer";
import Main from "@/components/Main";
import Navbar from "@/components/Navbar";
import { useState } from "react";





export default function Home() {

  const [showNavbar, setShowNavbar] = useState<boolean>(false);

  
  return (
    <>
      {showNavbar && <Navbar/>}
      <Main setShowNavbar={setShowNavbar} />
      <Footer/>
    </>
  );
}
