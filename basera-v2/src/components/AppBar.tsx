"use client"; // Add this line to mark this as a Client Component

import React, { useState } from 'react';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import Image from 'next/image';

const AppBar = () => {
  const [muted, setMuted] = useState(true);

  const toggleMic = () => {
    setMuted(!muted);
  };

  return (
    <div className="flex justify-between items-center px-4 py-2 bg-blue-600">
      {/* Logo */}
      <div className="flex items-center">
        <Image src="/logo.png" alt="Logo" width={50} height={50} />
      </div>

      {/* Mic Button */}
      <button onClick={toggleMic} className="text-white text-2xl">
        {muted ? <FaMicrophoneSlash /> : <FaMicrophone />}
      </button>
    </div>
  );
};

export default AppBar;
