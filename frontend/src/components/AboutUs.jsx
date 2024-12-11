import React from 'react';
import { motion, stagger } from 'framer-motion';
import { Shield, Globe, Wallet, CreditCard, ArrowRight, Users, Building } from 'lucide-react';

export function AboutUs() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardHover = {
    hover: {
      scale: 1.03,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-20">
      {/* Hero Section with enhanced animation */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-6">
          Revolutionizing Global Financial Services
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          At gopexi, we're building the future of international money management with secure, 
          efficient, and user-friendly financial solutions.
        </p>
      </motion.div>

      {/* Company Stats */}

      {/* Services Section with hover effects */}
      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.h2 
          className="text-3xl font-bold text-white text-center mb-12"
          {...fadeIn}
        >
          Our Core Services
        </motion.h2>

        {/* Currency Exchange */}
        <motion.div 
          className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg rounded-xl p-8 mb-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
          variants={cardHover}
          whileHover="hover"
        >
          <div className="flex items-start space-x-6">
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <Globe className="h-8 w-8 text-blue-500" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Currency Exchange</h3>
              <p className="text-gray-300 mb-4">
                Experience seamless currency exchange with competitive rates and minimal fees. 
                Our platform supports real-time conversions between multiple currencies, ensuring 
                you always get the best value for your money.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 text-blue-500 mr-2" />
                  Real-time exchange rates
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 text-blue-500 mr-2" />
                  Support for 150+ currencies
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 text-blue-500 mr-2" />
                  Transparent fee structure
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Multi-Currency Wallet */}
        <motion.div 
          className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg rounded-xl p-8 mb-8 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300"
          variants={cardHover}
          whileHover="hover"
        >
          <div className="flex items-start space-x-6">
            <div className="bg-orange-500/20 p-3 rounded-lg">
              <Wallet className="h-8 w-8 text-orange-500" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Multi-Currency Wallet</h3>
              <p className="text-gray-300 mb-4">
                Manage multiple currencies in one secure digital wallet. Our advanced wallet system 
                allows you to hold, exchange, and transfer different currencies effortlessly while 
                maintaining full control over your funds.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 text-orange-500 mr-2" />
                  Instant transfers between currencies
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 text-orange-500 mr-2" />
                  Bank-grade security measures
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 text-orange-500 mr-2" />
                  Real-time balance tracking
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Prepaid Cards */}
        <motion.div 
          className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg rounded-xl p-8 mb-8 border border-gray-700/50 hover:border-green-500/50 transition-all duration-300"
          variants={cardHover}
          whileHover="hover"
        >
          <div className="flex items-start space-x-6">
            <div className="bg-green-500/20 p-3 rounded-lg">
              <CreditCard className="h-8 w-8 text-green-500" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Prepaid Cards</h3>
              <p className="text-gray-300 mb-4">
                Access your funds anywhere with our international prepaid cards. Perfect for 
                travelers and international shoppers, our cards offer convenience, security, 
                and worldwide acceptance.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 text-green-500 mr-2" />
                  Virtual and physical cards available
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 text-green-500 mr-2" />
                  Zero foreign transaction fees
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 text-green-500 mr-2" />
                  Instant card top-up
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Why Choose Us with interactive cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.h2 
          className="text-3xl font-bold text-white text-center mb-12"
          {...fadeIn}
        >
          Why Choose gopexi
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-lg rounded-xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-blue-500/10 p-4 rounded-full w-fit mb-6">
              <Shield className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Security First</h3>
            <p className="text-gray-300">
              Bank-grade encryption and security measures to protect your funds and data.
            </p>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-lg rounded-xl p-8 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-orange-500/10 p-4 rounded-full w-fit mb-6">
              <Users className="h-8 w-8 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">24/7 Support</h3>
            <p className="text-gray-300">
              Dedicated customer support team available around the clock.
            </p>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-lg rounded-xl p-8 border border-gray-700/50 hover:border-green-500/50 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-green-500/10 p-4 rounded-full w-fit mb-6">
              <Building className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Regulated & Compliant</h3>
            <p className="text-gray-300">
              Fully licensed and compliant with international financial regulations.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 