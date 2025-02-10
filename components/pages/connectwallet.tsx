import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ConnectWallet: React.FC = () => {
  const navigate = useNavigate();
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      navigate("/"); // Redirects back to the home page after a few seconds
    }, 5000);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center text-white text-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-800/50 border border-gray-700 rounded-2xl shadow-lg p-10 backdrop-blur-md max-w-lg"
      >
        <h1 className="text-4xl font-bold text-blue-400">Launching Soon{dots}</h1>
        <p className="text-gray-300 mt-4">Please wait while we set up your experience.</p>
        <div className="mt-6 flex justify-center">
          <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConnectWallet;
