'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Battery, Zap, Code, RotateCcw, Smartphone } from 'lucide-react'
import { Card, CardContent } from '&/components/ui/card'

const easterEggs = [
  {
    id: 'tap_5_times',
    badge: 'tap_master',
    message: "You've unlocked the Tap Master badge!",
  },
  {
    id: 'konami_code',
    badge: 'code_breaker',
    message: 'Konami Code entered! Code Breaker badge unlocked!',
  },
  {
    id: 'charging',
    badge: 'power_up',
    message: 'Charging up! Power Up badge unlocked!',
  },
]

export default function EasterEggZone({
  unlockBadge,
}: {
  unlockBadge: (badge: string) => void
}) {
  const [tapCount, setTapCount] = useState(0)
  const [konamiIndex, setKonamiIndex] = useState(0)
  const [message, setMessage] = useState('')
  const [isCharging, setIsCharging] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const triggerAnimation = useCallback(() => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 2000)
  }, [])

  useEffect(() => {
    if (tapCount === 5) {
      unlockBadge('tap_master') // Moved inside `useEffect`
      setMessage(easterEggs[0].message)
      triggerAnimation()
      setTapCount(0)
    }
  }, [tapCount, unlockBadge, triggerAnimation])

  const handleTap = () => {
    setTapCount(prev => prev + 1)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const konamiCode = [
        'ArrowUp',
        'ArrowUp',
        'ArrowDown',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
        'ArrowLeft',
        'ArrowRight',
        'b',
        'a',
      ]
      if (event.key === konamiCode[konamiIndex]) {
        setKonamiIndex(prevIndex => {
          const nextIndex = prevIndex + 1
          if (nextIndex === konamiCode.length) {
            unlockBadge('code_breaker')
            setMessage(easterEggs[1].message)
            triggerAnimation()
            return 0
          }
          return nextIndex
        })
      } else {
        setKonamiIndex(0)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [konamiIndex, unlockBadge, triggerAnimation])

  useEffect(() => {
    const checkCharging = async () => {
      if ('getBattery' in navigator) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const battery = await (navigator as any).getBattery()
        setIsCharging(battery.charging)

        const handleBatteryChange = () => {
          setIsCharging(battery.charging)
          if (battery.charging) {
            unlockBadge('power_up')
            setMessage(easterEggs[2].message)
            triggerAnimation()
          }
        }

        battery.addEventListener('chargingchange', handleBatteryChange)

        return () =>
          battery.removeEventListener('chargingchange', handleBatteryChange)
      }
    }

    checkCharging()
  }, [unlockBadge, triggerAnimation])

  return (
    <Card className='overflow-hidden mt-8 text-blue-100 bg-gradient-to-br from-blue-900 to-purple-900'>
      <CardContent className='p-6'>
        <motion.div
          className='relative'
          initial={false}
          animate={isAnimating ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          <h3 className='flex items-center mb-2 text-xl font-bold'>
            <Zap className='mr-2' />
            Easter Egg Zone
          </h3>
          <p className='mb-4 text-sm'>Explore and discover hidden surprises!</p>
        </motion.div>

        <div className='space-y-4'>
          <EasterEggItem
            icon={<Smartphone />}
            text='Tap here repeatedly'
            onClick={handleTap}
          />
          <EasterEggItem icon={<Code />} text='Try the Konami code' />
          <EasterEggItem icon={<RotateCcw />} text='Flip your device' />
          {isCharging && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='flex items-center text-yellow-300'
            >
              <Battery className='mr-2' /> Charging...
            </motion.div>
          )}
        </div>

        <AnimatePresence>
          {message && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className='mt-4 font-semibold text-green-300'
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

interface EasterEggItemProps {
  icon: React.ReactNode
  text: string
  onClick?: () => void
}

const EasterEggItem: React.FC<EasterEggItemProps> = ({
  icon,
  text,
  onClick,
}) => (
  <motion.div
    className='flex items-center p-2 space-x-2 rounded-md cursor-pointer'
    whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
  >
    {icon}
    <span className='text-sm'>{text}</span>
  </motion.div>
)
