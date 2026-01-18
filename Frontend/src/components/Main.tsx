import { FC } from 'react';
import { motion } from "motion/react";
import { Sparkle, Video } from 'lucide-react';

const Main : FC= () => {
  return (
   <main className="relative min-h-screen w-full bg-linear-to-br from-black via-zinc-900 to-black text-white overflow-hidden">
   <div className="absolute -top-32 -left-32 size-96 bg-purple-600/20 rounded-full blur-3xl" />
   <div className="absolute top-1/3 -right-32 size-96 bg-blue-600/20 rounded-full blur-3xl" />
   <motion.div
     initial={{ y: 80, opacity: 0 }}
     animate={{y: 0, opacity: 1 }}
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
       className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-linear-to-r from-white to-zinc-200 text-black font-semibold text-lg shadow-xl">
         <Video size={22}/> Start Anonymous Chat
       </motion.button>
       

   </motion.div>
 </main>
  );
}

export default Main;
