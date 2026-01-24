import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { AnimatePresence, motion } from "motion/react";
import { Globe, Loader, Shuffle, Sparkle, Video } from 'lucide-react';
import { io } from 'socket.io-client';
import VideoRoom from './VideoRoom';

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
  transports: ["websocket"]
});


interface MainProps {
  setShowNavbar: Dispatch<SetStateAction<boolean>>;
}

const Main : FC<MainProps> = ({ setShowNavbar }) => {
  const [status, setStatus] = useState<"idle" | "waiting" | "connected">("idle");
  const [roomId, setRoomId] = useState<string>("");

  const startChat =  () => {
    socket.emit("start");
    setStatus("waiting");
  };

  const next = () => {
    socket.emit("next");
    window.location.reload();
  }

  useEffect(() => {
    socket.on("matched", (roomId) => {
      setRoomId(roomId);
      setStatus("connected");
      setShowNavbar(false);
    });

    socket.on("waiting", () => {
      setStatus("waiting");
    });
    socket.on("partner_left", () => {
      window.location.reload();
    });

    return () => { 
      socket.off();
     };
  },[])

  return (
   <main className="relative min-h-screen w-full bg-linear-to-br from-black via-zinc-900 to-black text-white overflow-hidden">
    <div className="absolute -top-32 -left-32 size-96 bg-purple-600/20 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-32 size-96 bg-blue-600/20 rounded-full blur-3xl" />
      <AnimatePresence >
      {status === "idle" &&  (
        <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center"
        >
          <div className="mb-6 flex items-center justify-center size-16 rounded-2xl bg-white/10 backdrop-blur border border-white/10">
            <Sparkle/>
          </div>
          <div className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
            Strangely
          </div>
          <p className="text-zinc-400 max-w-md mb-8 text-sm sm:text-base ">
            Anonymous video conversations with strangers worldwide.
            No sign-up. No identity just pure connection
          </p>
             <motion.button
             whileHover={{ scale: 1.09 }}
             whileTap={{ scale: 0.97 }}
             onClick={startChat}
             className="flex items-center gap-3 px-8 cursor-pointer py-4 rounded-2xl bg-linear-to-r from-white to-zinc-200 text-black font-semibold text-lg shadow-xl">
           <Video size={22}/> Start Anonymous Chat
         </motion.button>
      </motion.div>
        )}
        {status === "waiting" && (
         <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.7 }}
         className='relative flex flex-col items-center justify-center min-h-screen gap-6'>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, ease: "linear", duration: 0.8 }}
          >
            <Loader size={56}/>
          </motion.div>
            <motion.p 
            animate={{ opacity: [0.4, 1, 0.4]}}
            transition={{ repeat: Infinity, ease: "linear", duration: 1.1 }}
            className='text-lg sm:text-xl text-zinc-400'
            >
              Matching you with someone new...
            </motion.p>
         </motion.div>
        )}
        {status === "connected" && roomId && (
          <motion.div className='fixed inset-0 flex flex-col bg-black z-20'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          >
            <div className='flex items-center justify-between px-4 sm:px-6 py-4 bg-black/60 backdrop-blur border-b border-white/10'>
            <div className='flex items-center gap-2 text-zinc-400 text-sm'>
              <Globe size={16}/>
              Strangely | Connected
            </div>
              <motion.button onClick={next} className='flex items-center gap-2 px-4 py-2 cursor-pointer rounded-full bg-white text-black font-medium'>
                <Shuffle size={16}/>
                Next
              </motion.button>
            </div>
            <div className='flex-1 relative'>
              <VideoRoom roomId={roomId}/>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
  </main>
  );
}

export default Main;
