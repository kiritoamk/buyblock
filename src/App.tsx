import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { Canvas } from '@react-three/fiber';
import { CoinModel } from "../components/CoinModel"; 
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import ConnectWallet from "../components/pages/connectwallet"; 
import { Building, Globe2, Shield, Coins, ArrowRight, BarChart3, Users, Lock } from 'lucide-react';

function Home() {
  const [isWalletConnected] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();

  // Set dynamic tab title
  useEffect(() => {
    document.title = "BBUSD - Revolutionizing Real Estate";
  }, []);

  const handleNavigateToWallet = () => {
    navigate("/connect-wallet");
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        setIsVisible(true);
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
        setIsVisible(currentScrollY < lastScrollY.current);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white overflow-x-hidden">
      {/* Floating Navbar */}
      <div
        className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-7xl px-6 py-4 flex items-center justify-between z-50 transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <h1 className="text-2xl font-bold text-white">BBUSD</h1>
        <button 
          onClick={handleNavigateToWallet} 
          className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
        >
          {isWalletConnected ? 'Connected' : 'Connect Wallet'}
        </button>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row justify-center items-center pt-24 px-4">
        <div className="max-w-7xl w-full bg-gray-800/50 border border-gray-700 rounded-2xl shadow-lg p-10 backdrop-blur-md flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Revolutionizing Real Estate with{' '}
              <span className="text-purple-400">BBUSD</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto md:mx-0 mb-8">
              Buy Blocks is pioneering the future of real estate investment through blockchain technology.
              Our BBUSD token makes property trading as simple as trading stocks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center md:items-start">
              <button 
                onClick={handleNavigateToWallet} 
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-purple-700 transition-colors"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={handleNavigateToWallet} 
                className="bg-gray-800 text-white px-6 py-3 rounded-lg font-medium border border-gray-700 hover:bg-gray-700 transition-colors"
              >
                View Properties
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-[300px] md:h-[400px] flex justify-center items-center">
            <Canvas camera={{ position: [0, -1, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[3, 3, 3]} intensity={1} />
              <CoinModel />{/* Rotating Coin Model */}
            </Canvas>
          </div>
        </div>
      </div>

      {/* Why Choose Buy Blocks? */}
      <div className="py-10 lg:py-40 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl lg:text-5xl text-center font-medium text-purple-400 tracking-tight">Why Choose Buy Blocks?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {[{ icon: Building, title: "Tokenized Properties", description: "Pre-tokenized real estate listings with verified blockchain ownership" },
            { icon: Globe2, title: "Global Access", description: "Invest in properties worldwide without geographical restrictions" },
            { icon: Shield, title: "Secure Platform", description: "Advanced blockchain security and encrypted transactions" },
            { icon: Coins, title: "BBUSD Token", description: "Seamless property trading using our native BBUSD token" }
          ].map((item, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ scale: 1.05, boxShadow: "0px 4px 20px rgba(59, 130, 246, 0.3)" }}
              className="p-6 rounded-2xl bg-gray-800 border border-gray-700">
              <div className="w-14 h-14 bg-purple-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                {React.createElement(item.icon, { className: "w-7 h-7 text-purple-400" })}
              </div>
              <h3 className="text-lg font-semibold text-purple-400 text-center">{item.title}</h3>
              <p className="text-gray-400 text-center text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="flex justify-center items-center mt-16 px-4 mb-16">
        <div className="max-w-7xl w-full bg-gray-800/50 border border-gray-700 rounded-2xl shadow-lg p-8 backdrop-blur-md">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{
              title: "For Sellers",
              icon: <Users className="w-6 h-6 text-purple-400" />, 
              details: ["List pre-tokenized properties", "Reach global investors", "Secure blockchain verification", "Instant ownership transfers"],
            }, {
              title: "For Buyers",
              icon: <BarChart3 className="w-6 h-6 text-purple-400" />, 
              details: ["Browse global properties", "Verify ownership on blockchain", "Pay with BBUSD or crypto", "Instant token ownership"],
            }, {
              title: "Security",
              icon: <Lock className="w-6 h-6 text-purple-400" />, 
              details: ["Blockchain verification", "Encrypted transactions", "Secure smart contracts", "Compliance guidance"],
            }].map((item) => (
              <motion.div key={item.title} className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-purple-400 transition-transform duration-200">
                <div className="w-12 h-12 bg-purple-900 rounded-xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-4 text-white">{item.title}</h3>
                <ul className="text-gray-400 text-sm space-y-2">
                  {item.details.map((detail, i) => (
                    <li key={i}>• {detail}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-900 py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Real Estate Investment?</h2>
        <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
          Join the future of property trading with Buy Blocks. Start exploring tokenized real estate opportunities today.
        </p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={handleNavigateToWallet} 
            className="bg-white text-purple-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Get Started Now
          </button>
          <button 
            onClick={handleNavigateToWallet} 
            className="border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-800 transition-colors"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

function ConnectWalletWithTitle() {
  useEffect(() => {
    document.title = "BBUSD - Connect Your Wallet"; // Change tab title for ConnectWallet page
  }, []);

  return <ConnectWallet />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connect-wallet" element={<ConnectWalletWithTitle />} />
      </Routes>
    </Router>
  );
}

export default App;
