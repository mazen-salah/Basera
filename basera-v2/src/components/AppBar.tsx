"use client"; // Add this line to mark this as a Client Component

import React, { useState } from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import Image from "next/image";

const AppBar = () => {
  const [muted, setMuted] = useState(true);

  const toggleMic = () => {
    setMuted(!muted);
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-blue-800 shadow-md">
      {/* Logo */}
      <div className="flex items-center">
        <Image src="/logo.png" alt="Logo" width={50} height={50} className="h-12 w-12" />
        <span className="mr-4 text-white font-bold text-2xl">Basera</span>
      </div>

      {/* Mic Button */}
      <button
        onClick={toggleMic}
        className="text-white text-3xl focus:outline-none transition duration-300 ease-in-out hover:text-yellow-400"
        aria-label="Toggle microphone"
      >
        {muted ? <FaMicrophoneSlash /> : <FaMicrophone />}
      </button>
    </div>
  );
};

export default AppBar;
