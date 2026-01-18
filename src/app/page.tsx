"use client";

import Footer from "@/components/Footer";
import Main from "@/components/Main";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import { Sparkle, Video } from "lucide-react";


export default function Home() {
  return (
    <>
      <Navbar/>
      <Main/>
      <Footer/>
    </>
  );
}
