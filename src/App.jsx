import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoMdMic } from "react-icons/io";
import { dataContext } from "./context/userContext";

const App = () => {
  const { speak, recognition, transcript } = useContext(dataContext);
  const [isListening, setIsListening] = useState(false);

  const handleListen = () => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsListening(!isListening);
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white min-h-screen flex flex-col items-center justify-center gap-8 p-4">
      <motion.img
        src="./aura.png"
        alt="aura"
        className="w-70 h-70 md:w-100 md:h-100"
        initial={{ scale: 0, opacity: 0, rotate: 0 }}
        animate={{ scale: 1, opacity: 1, rotate: 360 }}
        transition={{
          scale: { duration: 0.5, ease: "easeOut" },
          opacity: { duration: 0.5, ease: "easeOut" },
          rotate: { duration: 40, ease: "linear", repeat: Infinity },
        }}
      />
      <motion.h1
        className="text-3xl md:text-5xl font-bold text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        I am Aura, Your Virtual assistant
      </motion.h1>
      <motion.p
        className="text-lg md:text-xl text-gray-400 text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        How can I help you today?
      </motion.p>
      <motion.button
        className={`relative flex items-center justify-center rounded-full w-20 h-20 md:w-24 md:h-24 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 ${
          isListening
            ? "bg-cyan-500/30 border-cyan-400/70 ring-cyan-400 shadow-cyan-500/40"
            : "bg-gray-700/50 border-gray-600 hover:bg-cyan-400/20 hover:border-cyan-300/50 ring-cyan-400 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/30"
        }`}
        aria-label="Start listening"
        onClick={handleListen}
      >
        {isListening && (
          <motion.div
            className="absolute inset-0 rounded-full bg-cyan-400/50"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <IoMdMic className="relative text-3xl md:text-4xl text-cyan-300" />
      </motion.button>
      {transcript && (
        <p className="text-gray-300 text-center max-w-xl">{transcript}</p>
      )}
    </div>
  );
};

export default App;
