"use client";

import Footer from "@/components/Footer";
import Main from "@/components/Main";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
  transports: ["websocket"]
});


export default function Home() {

  useEffect(() => {
    socket.emit("name", "Prince")
  },[]);
  
  return (
    <>
      <Navbar/>
      <Main/>
      <Footer/>
    </>
  );
}
