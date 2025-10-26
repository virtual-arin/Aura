import React, { useContext, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { userDataContext } from "../contexts/userContext";
import { Link, useNavigate } from "react-router-dom";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { serverUrl } from "../main";

const Home = () => {
  const { userData, fetchCurrentUser } = useContext(userDataContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogout = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await axios.post(
        `${serverUrl}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      await fetchCurrentUser();
      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred during logout."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-t from-black to-[#02023d]">
      {userData && (
        <div className="absolute top-4 right-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-gray-300 hover:text-white"
          >
            <RiLogoutBoxRLine className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      )}
      <div className="flex flex-col items-center justify-center min-h-screen ">
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
        <h1 className="mt-8 text-4xl font-bold text-gray-100">
          Welcome {userData?.name} to Aura
        </h1>
        <p className="mt-2 text-lg text-gray-100">Your friendly AI chatbot.</p>
      </div>
    </div>
  );
};

export default Home;
