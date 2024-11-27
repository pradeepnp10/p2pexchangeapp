'use client'

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiUser, FiMapPin, FiShield, FiCheck, FiUpload } from 'react-icons/fi'

export function KYCForm() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    nationality: '',
    phoneNumber: '',
    email: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    idType: 'passport',
    idNumber: '',
    idExpiryDate: '',
    idDocument: null
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name) => (value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, idDocument: e.target.files[0] }))
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1)
  }

  const validateStep = (step) => {
    switch(step) {
      case 1:
        return formData.fullName && formData.dateOfBirth && formData.nationality && 
               formData.phoneNumber && formData.email
      case 2:
        return formData.address && formData.city && formData.state && 
               formData.postalCode && formData.country
      case 3:
        return formData.idType && formData.idNumber && formData.idExpiryDate && formData.idDocument
      default:
        return false
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep(3)) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Store KYC data
      localStorage.setItem('kycStatus', 'completed')
      localStorage.setItem('kycData', JSON.stringify(formData))
      
      // Redirect to dashboard
      navigate('/dashboard')
    } catch (error) {
      console.error('KYC submission failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const renderPersonalInfo = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="form-input"
            placeholder="John Doe"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="form-input"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-group">
          <label className="form-label">Nationality</label>
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            className="form-input"
            placeholder="Your Nationality"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="form-input"
            placeholder="+1 234 567 8900"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-input"
          placeholder="john.doe@example.com"
        />
      </div>
    </motion.div>
  )

  const renderAddressDetails = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="form-group">
        <label className="form-label">Street Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="form-input"
          placeholder="123 Main Street"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-group">
          <label className="form-label">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="form-input"
            placeholder="Your City"
          />
        </div>
        <div className="form-group">
          <label className="form-label">State/Province</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="form-input"
            placeholder="Your State"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-group">
          <label className="form-label">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className="form-input"
            placeholder="12345"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="form-input"
            placeholder="Your Country"
          />
        </div>
      </div>
    </motion.div>
  )

  const renderIdentityVerification = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="form-group">
        <label className="form-label">ID Type</label>
        <select
          name="idType"
          value={formData.idType}
          onChange={handleChange}
          className="form-select"
        >
          <option value="passport">Passport</option>
          <option value="nationalID">National ID</option>
          <option value="driverLicense">Driver's License</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-group">
          <label className="form-label">ID Number</label>
          <input
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter ID Number"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Expiry Date</label>
          <input
            type="date"
            name="idExpiryDate"
            value={formData.idExpiryDate}
            onChange={handleChange}
            className="form-input"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Upload ID Document</label>
        <div className="mt-2">
          <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-white/20 border-dashed rounded-xl">
            <div className="space-y-1 text-center">
              <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-400">
                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-blue-400 hover:text-blue-300">
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="idDocument"
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.pdf"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-400">
                PNG, JPG, PDF up to 10MB
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )

  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return renderPersonalInfo()
      case 2:
        return renderAddressDetails()
      case 3:
        return renderIdentityVerification()
      default:
        return null
    }
  }

  const steps = [
    { number: 1, title: "Personal Info", icon: <FiUser className="w-6 h-6" /> },
    { number: 2, title: "Address", icon: <FiMapPin className="w-6 h-6" /> },
    { number: 3, title: "Verify ID", icon: <FiShield className="w-6 h-6" /> }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Complete Your KYC
            </h2>
            <p className="text-gray-400 mt-2">Verify your identity to start trading</p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between items-center mb-12 relative">
            {steps.map((step, index) => (
              <div key={step.number} className="flex-1 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  <div className={`
                    w-16 h-16 mx-auto rounded-full flex items-center justify-center
                    ${currentStep >= step.number 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                      : 'bg-gray-700'}
                    transition-all duration-300 transform hover:scale-110
                  `}>
                    {currentStep > step.number ? (
                      <FiCheck className="w-8 h-8 text-white" />
                    ) : (
                      <div className="text-white">{step.icon}</div>
                    )}
                  </div>
                  <h3 className="mt-4 text-sm font-medium text-gray-300">{step.title}</h3>
                  {index < steps.length - 1 && (
                    <div className={`
                      absolute top-8 left-1/2 w-full h-1 rounded
                      ${currentStep > step.number ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-700'}
                    `} />
                  )}
                </motion.div>
              </div>
            ))}
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="mt-10">
            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-10">
              {currentStep > 1 && (
                <motion.button
                  type="button"
                  onClick={handlePrevious}
                  className="px-8 py-3 bg-gray-700 rounded-xl text-white hover:bg-gray-600 
                    transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Previous
                </motion.button>
              )}
              
              {currentStep < 3 ? (
                <motion.button
                  type="button"
                  onClick={handleNext}
                  className={`px-8 py-3 rounded-xl text-white transition-all duration-300 ml-auto
                    ${validateStep(currentStep)
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                      : 'bg-gray-600 cursor-not-allowed'}`}
                  whileHover={validateStep(currentStep) ? { scale: 1.02 } : {}}
                  whileTap={validateStep(currentStep) ? { scale: 0.98 } : {}}
                  disabled={!validateStep(currentStep)}
                >
                  Continue
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={!validateStep(3) || isLoading}
                  className={`px-8 py-3 rounded-xl text-white transition-all duration-300 ml-auto
                    ${validateStep(3) && !isLoading
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                      : 'bg-gray-600 cursor-not-allowed'}`}
                  whileHover={validateStep(3) && !isLoading ? { scale: 1.02 } : {}}
                  whileTap={validateStep(3) && !isLoading ? { scale: 0.98 } : {}}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Submitting...
                    </div>
                  ) : (
                    'Submit KYC'
                  )}
                </motion.button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default KYCForm;