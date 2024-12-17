"use client"

import React from 'react'
import { motion } from 'motion/react'
import { useMediaQuery } from 'react-responsive'

interface LoginProps {
  onToggleForm: () => void
  isVisible: boolean
}

function Login({ onToggleForm, isVisible }: LoginProps) {
  const isMobile = useMediaQuery({ maxWidth: 768 })

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ 
        x: 0, 
        opacity: 1,
        position: isVisible ? 'relative' : 'absolute'
      }}
      exit={{ x: 50, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full max-w-md mx-auto p-6"
    >
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign In
          </button>
        </form>

     
          <div className="relative w-full h-14 bg-gray-100 rounded-full p-1">
            <motion.div
              className="absolute top-1 left-1 w-[calc(50%-4px)] h-[calc(100%-8px)] bg-white rounded-full shadow-md"
              initial={false}
              animate={{ x: isVisible ? '0%' : '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <div className="relative w-full h-full grid grid-cols-2">
              <motion.button
                className={`rounded-full ${isVisible ? 'text-indigo-600' : 'text-gray-500'}`}
                onClick={() => !isVisible && onToggleForm()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
              <motion.button
                className={`rounded-full ${!isVisible ? 'text-indigo-600' : 'text-gray-500'}`}
                onClick={() => isVisible && onToggleForm()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Register
              </motion.button>
            </div>
          </div>
      
      </div>
    </motion.div>
  )
}

export default Login
