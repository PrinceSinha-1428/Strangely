"use client";

import { FC } from 'react';

const Footer: FC = () => {
  return (
    <div className='relative z-10 text-center py-6 text-xs text-zinc-500 bg-black border-b border-white/10'>
      &copy;  {new Date().getFullYear() } Strangely | Anonymous Video/Voice Chat
    </div>
  );
}

export default Footer;
