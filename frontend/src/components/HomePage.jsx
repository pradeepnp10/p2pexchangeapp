import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from './Navigation';
import { toast } from 'react-hot-toast';
import { ChatBot } from './ChatBot';
import { motion } from 'framer-motion';
import globeAnimation from '../assets/Globe loop.mp4';
import { useTranslation } from 'react-i18next';

export function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(false);

  // Supported currencies
  const currencies = [
    'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'HKD', 
    'NZD', 'SGD', 'SEK', 'DKK', 'NOK'
  ];

  // Fetch exchange rate
  const fetchExchangeRate = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/e074617efd7dd1aaf176515e/latest/${fromCurrency}`
      );
      const data = await response.json();
      
      if (data.result === 'success') {
        setExchangeRate(data.conversion_rates[toCurrency]);
      } else {
        toast.error('Failed to fetch exchange rate');
      }
    } catch (error) {
      toast.error('Error fetching exchange rate');
    } finally {
      setLoading(false);
    }
  };

  // Calculate converted amount with 0.2% fee
  const calculateConversion = () => {
    if (!amount || !exchangeRate) return;
    
    const baseConversion = amount * exchangeRate;
    const fee = baseConversion * 0.002; // 0.2% fee
    const totalAmount = baseConversion + fee;
    
    setConvertedAmount({
      baseAmount: baseConversion.toFixed(2),
      fee: fee.toFixed(2),
      totalAmount: totalAmount.toFixed(2)
    });
  };

  // Fetch rate when currencies change
  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetchExchangeRate();
    }
  }, [fromCurrency, toCurrency]);

  // Calculate when amount or rate changes
  useEffect(() => {
    calculateConversion();
  }, [amount, exchangeRate]);

  // Updated button styles and animations
  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 30px -10px rgba(59, 130, 246, 0.5)",
    },
    tap: { scale: 0.95 }
  };

  // Updated Hero Section with better text alignment
  const heroSection = (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          <span className="typing-animation inline-block overflow-hidden whitespace-nowrap">
            {t('home.connectingPayments')}
          </span>
          <br />
          <span className="typing-animation inline-block overflow-hidden whitespace-nowrap">
            {t('home.empoweringExchange')}
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          {t('home.exchangeDescription')}
        </p>
        <div className="flex justify-center">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => navigate('/signup')}
            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-12 py-4 rounded-xl text-lg font-medium 
              backdrop-blur-lg shadow-[0_0_30px_rgba(59,130,246,0.3)] 
              border border-blue-500/20 transition-all duration-300"
          >
            Get Started
          </motion.button>
        </div>
      </div>
    </div>
  );

  // Updated converter section with glass morphism
  const converterSection = (
    <div className="py-16 md:py-24 relative px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto relative"
      >
        {/* Enhanced background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-purple-900/30 backdrop-blur-xl rounded-2xl"></div>
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:30px_30px] rounded-2xl"></div>
        
        <div className="relative bg-white/5 rounded-2xl p-6 md:p-10 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.1)]">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t('home.currencyConverter')}
            </h2>
            <p className="text-gray-400">{t('home.realTimeRates')}</p>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <label className="block text-gray-300 text-sm font-medium mb-2">You Send</label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-gray-700/50 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 hover:bg-gray-700/70"
                    placeholder="Enter amount"
                    min="0"
                  />
                  <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-600 text-white px-2 py-1 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer hover:bg-gray-500 transition-colors"
                  >
                    {currencies.map((currency) => (
                      <option key={currency} value={currency}>{currency}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-gray-300 text-sm font-medium mb-2">You Receive</label>
                <div className="relative">
                  <input
                    type="text"
                    value={convertedAmount ? convertedAmount.baseAmount : ''}
                    readOnly
                    className="w-full bg-gray-700/50 text-white px-4 py-3 rounded-xl outline-none"
                    placeholder="0.00"
                  />
                  <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-600 text-white px-2 py-1 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer hover:bg-gray-500 transition-colors"
                  >
                    {currencies.map((currency) => (
                      <option key={currency} value={currency}>{currency}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Exchange Rate Display */}
            {exchangeRate && (
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                <span>Exchange Rate:</span>
                <span className="font-medium text-white">
                  1 {fromCurrency} = {exchangeRate?.toFixed(4)} {toCurrency}
                </span>
              </div>
            )}

            {/* Conversion Details */}
            {convertedAmount && (
              <div className="bg-gray-700/30 rounded-xl p-3 md:p-4 space-y-2 md:space-y-3 text-sm md:text-base">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Converted Amount</span>
                  <span className="text-white font-medium">
                    {convertedAmount.baseAmount} {toCurrency}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Service Fee (0.2%)</span>
                  <span className="text-white font-medium">
                    {convertedAmount.fee} {toCurrency}
                  </span>
                </div>
                <div className="border-t border-gray-600 my-2"></div>
                <div className="flex justify-between">
                  <span className="text-gray-300 font-medium">Total Amount</span>
                  <span className="text-white font-bold">
                    {convertedAmount.totalAmount} {toCurrency}
                  </span>
                </div>
              </div>
            )}

            {/* Updated CTA Button */}
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => navigate('/signup')}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-medium 
                backdrop-blur-lg border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.3)]
                transition-all duration-300"
            >
              Start Converting Now
            </motion.button>

            {/* Additional Info */}
            <div className="text-center text-sm text-gray-400">
              <p>No hidden fees • Secure transactions • 24/7 support</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  // Add these CSS animations to your global styles or component
  const styles = `
    @keyframes blob {
      0% {
        transform: translate(0px, 0px) scale(1);
      }
      33% {
        transform: translate(30px, -50px) scale(1.1);
      }
      66% {
        transform: translate(-20px, 20px) scale(0.9);
      }
      100% {
        transform: translate(0px, 0px) scale(1);
      }
    }
    
    .animate-blob {
      animation: blob 7s infinite;
    }
    
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    
    .animation-delay-4000 {
      animation-delay: 4s;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
      }
      70% {
        box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
      }
    }

    .step-animation {
      animation: slideIn 0.5s ease-out forwards;
      opacity: 0;
    }

    .step-icon-pulse {
      animation: pulse 2s infinite;
    }

    .hover-scale {
      transition: all 0.3s ease;
    }

    .hover-scale:hover {
      transform: scale(1.05);
      background: rgba(59, 130, 246, 0.1);
      border-radius: 1rem;
    }

    .connecting-line {
      position: absolute;
      top: 25px;
      left: 50%;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, #3B82F6 50%, transparent 50%);
      background-size: 200% 100%;
      animation: line-flow 2s linear infinite;
    }

    @keyframes line-flow {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    .floating {
      animation: float 6s ease-in-out infinite;
    }

    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
      100% { transform: translateY(0px); }
    }

    @keyframes scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }

    .animate-scroll {
      animation: scroll 30s linear infinite;
    }

    @keyframes typing {
      from { width: 0 }
      to { width: 100% }
    }
    
    @keyframes blink {
      50% { border-color: transparent }
    }
    
    .typing-animation {
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      animation: 
        typing 3.5s steps(40, end),
        blink 1s step-end infinite;
      margin: 0 auto;
    }
  `;

  // Add this style tag to your document head or CSS file
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);

  const steps = [
    {
      number: "1",
      title: "Sign Up",
      description: "Create your account in minutes",
      icon: "👤",
      delay: 0
    },
    {
      number: "2",
      title: "KYC Verification",
      description: "Quick and easy verification process",
      icon: "✓",
      delay: 200
    },
    {
      number: "3",
      title: "Add Funds",
      description: "Load your wallet with your preferred currency",
      icon: "💰",
      delay: 400
    },
    {
      number: "4",
      title: "Start Converting",
      description: "Exchange currencies at great rates",
      icon: "💱",
      delay: 600
    }
  ];

  // Updated How It Works section
  const howItWorksSection = (
    <div className="py-10 md:py-20 relative overflow-hidden px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-16">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 relative">
          {/* Remove connecting lines on mobile */}
          <div className="hidden md:block absolute top-6 left-[25%] right-[25%] h-0.5 bg-blue-600/30">
            <div className="connecting-line"></div>
          </div>

          {steps.map((step, index) => (
            <div key={index} className="relative step-animation hover-scale p-4 md:p-6">
              <div className="text-center relative z-10">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6
                  step-icon-pulse transform hover:rotate-12 transition-transform duration-300">
                  <span className="text-2xl text-white">{step.icon}</span>
                  <span className="absolute -bottom-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center
                    text-white text-sm font-bold">{step.number}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 
                  hover:text-blue-400 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-300 hover:text-gray-100 transition-colors duration-300">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Add this new component after the converterSection
  const flagsBanner = (
    <div className="py-8 bg-gray-800/30 overflow-hidden">
      <div className="flex animate-scroll space-x-8">
        {[...currencies, ...currencies].map((currency, index) => (
          <div 
            key={`${currency}-${index}`} 
            className="flex items-center space-x-2 min-w-fit"
          >
            <img
              src={`https://flagcdn.com/${currency.toLowerCase().slice(0, 2)}.svg`}
              alt={`${currency} flag`}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-gray-400">{currency}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // Updated feature card styling
  const FeatureCard = ({ icon, title, description }) => (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gray-50 p-8 rounded-xl border border-gray-200
        hover:bg-gray-100 transition-all duration-300 shadow-lg"
    >
      <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl 
        flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );

  // Add this to your existing styles
  const additionalStyles = `
    .glass-card {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    }

    .gradient-border {
      position: relative;
      background: linear-gradient(to right, #3B82F6, #8B5CF6);
      padding: 1px;
      border-radius: 1rem;
    }

    .gradient-border::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 1rem;
      padding: 2px;
      background: linear-gradient(to right, #3B82F6, #8B5CF6);
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
    }
  `;

  // Updated globe section with CTA button
  const globeSection = (
    <div className="w-full relative">
      {/* Video Background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="w-full h-auto object-cover"
      >
        <source src={globeAnimation} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Text and CTA */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-wide">
            Send Money Globally
          </h2>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto px-4 mb-8">
            Fast, secure, and borderless transactions at your fingertips
          </p>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => navigate('/signup')}
            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-12 py-4 rounded-xl text-lg font-medium 
              backdrop-blur-lg shadow-[0_0_30px_rgba(59,130,246,0.3)] 
              border border-blue-500/20 transition-all duration-300
              hover:from-blue-500 hover:to-blue-400"
          >
            Start Sending Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <Navigation />
      
      {/* Hero Section */}
      {heroSection}

      {/* Currency Converter Section */}
      {converterSection}
      {flagsBanner}

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose Our Platform?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Multi-Currency Support */}
            <FeatureCard
              icon={<span className="text-white">💱</span>}
              title="Multi-Currency Support"
              description="Exchange between multiple major currencies with competitive rates. Support for USD, EUR, GBP, and more."
            />

            {/* Secure Transactions */}
            <FeatureCard
              icon={<span className="text-white">🔒</span>}
              title="Secure Transactions"
              description="Bank-grade security with advanced encryption and secure payment processing. Your funds are always safe."
            />

            {/* Instant Processing */}
            <FeatureCard
              icon={<span className="text-white">⚡</span>}
              title="Instant Processing"
              description="Quick and efficient currency exchange with real-time rates. No waiting for days to complete transactions."
            />
          </div>
        </div>
      </div>

      {globeSection}

      {/* How It Works */}
      {howItWorksSection}

      {/* Add ChatBot at the end */}
      <ChatBot />
    </div>
  );
} 