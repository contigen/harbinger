import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

interface GreetingProps {
  username?: string
}

export default function Greeting({ username }: GreetingProps) {
  const greetings = [
    'Welcome to your digital destiny',
    'Prepare for a cosmic tech journey',
    "Your device's secrets await",
    'Unlock the mysteries of your gadgets',
    'Dive into the digital unknown',
  ]

  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)]

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='mb-8 text-center'
    >
      <h1 className='flex justify-center items-center mb-2 text-4xl font-bold text-blue-400'>
        <Sparkles className='mr-2' />
        {username ? `Hello, ${username}!` : 'Greetings, Digital Explorer!'}
      </h1>
      <p className='text-xl text-gray-300'>{randomGreeting}</p>
    </motion.div>
  )
}
