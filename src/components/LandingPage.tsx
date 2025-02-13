'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import MinimalistStarField from './MinimalistStarField'

interface LandingPageProps {
  onReveal: () => void
}

export default function LandingPage({ onReveal }: LandingPageProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-gray-900 overflow-hidden'>
      <MinimalistStarField />

      <AnimatePresence mode='wait'>
        {isLoading ? (
          <LoadingAnimation key='loading' />
        ) : (
          <Content key='content' onReveal={onReveal} />
        )}
      </AnimatePresence>
    </div>
  )
}

const LoadingAnimation: React.FC = () => (
  <motion.div
    className='flex flex-col items-center justify-center'
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div
      className='w-16 h-16 border-t-2 border-blue-400 rounded-full'
      animate={{ rotate: 360 }}
      transition={{
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: 'linear',
      }}
    />
    <motion.p
      className='mt-4 text-blue-300 text-sm font-light tracking-widest'
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: 'easeInOut',
      }}
    >
      ALIGNING
    </motion.p>
  </motion.div>
)

interface ContentProps {
  onReveal: () => void
}

const Content: React.FC<ContentProps> = ({ onReveal }) => (
  <motion.div
    className='text-center z-10 max-w-lg px-4'
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <motion.h1
      className='text-5xl sm:text-7xl font-thin mb-6 text-blue-300 tracking-widest'
      initial={{ letterSpacing: '0.5em', opacity: 0 }}
      animate={{ letterSpacing: '0.2em', opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      HARBINGER
    </motion.h1>
    <motion.h2
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='text-4xl font-bold mb-4 text-blue-400'
    >
      Discover Your Fortune, Powered by Your Device
    </motion.h2>
    <motion.p
      className='text-lg mb-12 text-blue-200 font-light'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      Unveil the cosmic potential within your device
    </motion.p>
    <InteractiveOrb />
    <motion.button
      className='mt-12 px-8 py-3 bg-transparent border border-blue-400 text-blue-300 rounded-full text-sm tracking-widest transition-all duration-300 ease-in-out'
      whileHover={{
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onReveal}
    >
      INITIATE
    </motion.button>
  </motion.div>
)

const InteractiveOrb: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className='relative w-40 h-40 mx-auto'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className='absolute inset-0 bg-blue-400 rounded-full opacity-10'
        animate={{
          scale: isHovered ? [1, 1.2, 1] : 1,
          opacity: isHovered ? [0.1, 0.3, 0.1] : 0.1,
        }}
        transition={{
          duration: 2,
          repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className='absolute inset-4 bg-blue-300 rounded-full opacity-10'
        animate={{
          scale: isHovered ? [1, 1.1, 1] : 1,
          opacity: isHovered ? [0.1, 0.2, 0.1] : 0.1,
        }}
        transition={{
          duration: 2,
          repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
          ease: 'easeInOut',
          delay: 0.2,
        }}
      />
      <motion.div
        className='absolute inset-0 flex items-center justify-center'
        animate={{ rotate: isHovered ? 360 : 0 }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'linear',
        }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute w-1 h-1 bg-blue-200 rounded-full'
            style={{
              top: `${50 + 45 * Math.sin((i * Math.PI) / 4)}%`,
              left: `${50 + 45 * Math.cos((i * Math.PI) / 4)}%`,
            }}
            animate={{ opacity: isHovered ? [0.2, 1, 0.2] : 0.2 }}
            transition={{
              duration: 1.5,
              repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
      <Sparkles className='absolute inset-0 m-auto text-blue-300 w-8 h-8' />
    </motion.div>
  )
}
