import { getReturningUserMessage } from '&/lib/utils'
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function Greeting() {
  const { data } = useVisitorData({ extendedResult: true }, { immediate: true })
  const userId = data?.visitorId
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
        {userId ? `Hello, User #${userId}!` : 'Greetings, Digital Explorer!'}
      </h1>
      <p className='text-xl text-gray-300'>
        {randomGreeting} <br />
      </p>
      <p className='text-sm text-gray-200'>
        {getReturningUserMessage(
          data?.firstSeenAt?.global ?? undefined,
          data?.lastSeenAt?.global ?? undefined
        )}
      </p>
    </motion.div>
  )
}
