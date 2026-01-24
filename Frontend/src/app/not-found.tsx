"use client";

import { motion } from "motion/react";
import { Video, Shuffle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-screen w-full bg-linear-to-br from-black via-zinc-900 to-black text-white overflow-hidden flex items-center justify-center px-6">
      
      <div className="absolute -top-32 -left-32 size-96 bg-purple-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-32 size-96 bg-blue-600/20 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center max-w-md"
      >

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          You’re alone here.
        </h1>

        <p className="text-zinc-400 mb-10 text-sm sm:text-base">
          This page doesn’t exist.<br />
          Maybe the stranger already left.
        </p>

        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-3 px-8 py-4 cursor-pointer rounded-2xl bg-linear-to-r from-white to-zinc-200 text-black font-semibold text-lg shadow-xl"
          >
            <Video size={22} />
            Start a new chat
          </motion.button>
        </Link>
      </motion.div>
    </main>
  );
}
