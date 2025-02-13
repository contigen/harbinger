import { motion } from 'framer-motion'
import { Award } from 'lucide-react'

const badgeData = {
  early_adopter: {
    name: 'Early Adopter',
    description: 'One of the first to discover Harbinger',
    color: 'text-green-400',
  },
  digital_explorer: {
    name: 'Digital Explorer',
    description: "Curious about your device's secrets",
    color: 'text-purple-400',
  },
  tap_master: {
    name: 'Tap Master',
    description: "You've got the magic touch",
    color: 'text-yellow-400',
  },
  code_breaker: {
    name: 'Code Breaker',
    description: 'You know the secret code',
    color: 'text-red-400',
  },
  acrobat: {
    name: 'Digital Acrobat',
    description: 'Flipping screens like a pro',
    color: 'text-pink-400',
  },
}

export default function BadgeCollection({ badges }: { badges: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className='p-6 bg-gray-800 rounded-lg border border-blue-500 shadow-lg'
    >
      <h2 className='mb-6 text-2xl font-bold text-blue-400'>
        Digital Achievements
      </h2>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
        {badges.map((badge, index) => (
          <motion.div
            key={badge + index}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className='flex flex-col items-center p-4 bg-gray-700 rounded-lg'
          >
            <Award
              className={`w-12 h-12 mb-2 ${
                badgeData[badge as keyof typeof badgeData].color
              }`}
            />
            <h3 className='mb-1 text-lg font-semibold'>
              {badgeData[badge as keyof typeof badgeData].name}
            </h3>
            <p className='text-sm text-center text-gray-400'>
              {badgeData[badge as keyof typeof badgeData].description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
