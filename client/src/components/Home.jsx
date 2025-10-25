import React from "react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#23262f]">
      <motion.img
        src="/chatbot.png"
        alt="Chatbot"
        className="w-200 h-96"
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      />
      <h1 className="mt-8 text-4xl font-bold text-gray-100">Welcome to Aura</h1>
      <p className="mt-2 text-lg text-gray-100">Your friendly AI chatbot.</p>
    </div>
  );
};

export default Home;
