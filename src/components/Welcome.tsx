import { motion } from "framer-motion"

export default function Welcome() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-blue-400 mb-4">Welcome to Harbinger</h1>
        <p className="text-xl text-gray-300">Your digital fortune awaits...</p>
      </motion.div>
    </div>
  )
}

