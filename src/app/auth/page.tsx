"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'


function AuthPage() {
  const [isLoginVisible, setIsLoginVisible] = useState(true)

  const toggleForm = () => {
    setIsLoginVisible(!isLoginVisible)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="relative w-full max-w-md"
        layout
      >
        <AnimatePresence mode="wait">
          {isLoginVisible ? (
            <Login key="login" onToggleForm={toggleForm} isVisible={isLoginVisible} />
          ) : (
            <Register key="register" onToggleForm={toggleForm} isVisible={!isLoginVisible} />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default AuthPage
