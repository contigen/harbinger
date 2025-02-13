'use client'

import { useState, useEffect, useCallback, useRef, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, MessageCircle, Zap, Cpu, Download } from 'lucide-react'
import { Button } from '&/components/ui/button'
import { Input } from '&/components/ui/input'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '&/components/ui/card'
import { askQuestion, generateFortune } from '&/action'
import html2canvas from 'html2canvas'
import { Fortune, TDeviceMetrics } from '&/types'
import { Spinner } from './ui/spinner'
import { calculateRarityScore } from '&/lib/utils'

interface AIFortuneAnalysisProps {
  deviceMetrics: TDeviceMetrics
  fortuneImage: string | null
  setFortune: React.Dispatch<React.SetStateAction<Fortune>>
  addToFortuneHistory: (fortune: Fortune) => void
  setFortuneImage: React.Dispatch<React.SetStateAction<string | null>>
}

export default function AIFortuneAnalysis({
  deviceMetrics,
  setFortune,
  addToFortuneHistory,
  fortuneImage,
  setFortuneImage,
}: AIFortuneAnalysisProps) {
  const [localFortune, setLocalFortune] = useState<Fortune | null>(null)
  const [answer, setAnswer] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isInitialMount = useRef(true)
  const prevDeviceMetrics = useRef(deviceMetrics)
  const fortuneCardRef = useRef<HTMLDivElement>(null)

  const memoizedSetFortune = useCallback(
    (fortune: Fortune) => {
      setFortune(fortune)
    },
    [setFortune]
  )

  const memoizedAddToFortuneHistory = useCallback(
    (fortune: Fortune) => {
      addToFortuneHistory(fortune)
    },
    [addToFortuneHistory]
  )

  const fetchFortuneAndArchetype = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const rarityScore = calculateRarityScore(deviceMetrics)
      const fortuneResult = await generateFortune({
        ...deviceMetrics,
        rarityScore,
        chargingStatus: true,
        localTime: new Date().toLocaleString(),
      })
      const updatedFortuneResult = { ...fortuneResult, rarityScore }
      setLocalFortune(updatedFortuneResult)
      memoizedSetFortune(updatedFortuneResult)
      memoizedAddToFortuneHistory(updatedFortuneResult)
    } catch {
      setError('Failed to fetch your tech fortune. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }, [deviceMetrics, memoizedSetFortune, memoizedAddToFortuneHistory])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      fetchFortuneAndArchetype()
    } else if (
      JSON.stringify(deviceMetrics) !==
      JSON.stringify(prevDeviceMetrics.current)
    ) {
      fetchFortuneAndArchetype()
    }
    prevDeviceMetrics.current = deviceMetrics
  }, [deviceMetrics, fetchFortuneAndArchetype])

  useEffect(() => {
    if (localFortune && fortuneCardRef.current) {
      html2canvas(fortuneCardRef.current).then(canvas => {
        const imageDataUrl = canvas.toDataURL()
        setFortuneImage(imageDataUrl)
      })
    }
  }, [localFortune, setFortuneImage])

  const handleAskQuestion = async (evt: FormEvent) => {
    evt.preventDefault()
    const formData = new FormData(evt.currentTarget as HTMLFormElement)
    setIsPending(true)
    setError(null)
    const prompt = formData.get('prompt')?.toString()
    try {
      const response = await askQuestion(prompt!, deviceMetrics, localFortune!)
      setAnswer(response)
    } catch {
      setError(
        'Oops! The digital spirits are a bit confused. Try asking again later.'
      )
    } finally {
      setIsPending(false)
    }
  }

  const handleDownload = useCallback(() => {
    if (fortuneImage) {
      const link = document.createElement('a')
      link.href = fortuneImage
      link.download = 'tech-fortune.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }, [fortuneImage])

  return (
    <div className='space-y-6'>
      <Card className='text-white bg-gradient-to-br from-indigo-500 to-purple-600'>
        <CardHeader>
          <CardTitle className='flex items-center text-2xl font-bold'>
            <Cpu className='mr-2' />
            Your Tech Archetype
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode='wait'>
            {localFortune?.archetype && (
              <motion.div
                key={localFortune.archetype}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className='mb-2 text-xl font-semibold'>
                  {localFortune.archetype}
                </h3>
                <p className='text-sm opacity-90'>{localFortune.analysis}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      <Card
        className='text-white bg-gradient-to-br from-blue-500 to-teal-400'
        ref={fortuneCardRef}
      >
        <CardHeader>
          <CardTitle className='flex items-center text-2xl font-bold'>
            <Sparkles className='mr-2' />
            Your Tech Fortune
          </CardTitle>
          <CardDescription className='text-blue-100'>
            AI Personality: {localFortune?.personality || 'Loading...'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode='wait'>
            {localFortune && (
              <motion.div
                key={localFortune.header}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className='mb-2 text-xl font-semibold'>
                  {localFortune.header}
                </h3>
                <p className='mb-4 text-sm'>{localFortune.prediction}</p>
                <div className='flex justify-between text-xs opacity-90'>
                  <span>Lucky Tech Item: {localFortune.luckyTechItem}</span>
                  <span>Lucky Tech Item: {localFortune.techAura}</span>
                  <span>Tech Aura: {localFortune.techAuraColor}</span>
                  <span>Rarity: {localFortune.rarityScore}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {fortuneImage && (
            <Button
              onClick={handleDownload}
              className='mt-4 text-blue-500 bg-white hover:bg-blue-100'
            >
              <Download className='mr-2 w-4 h-4' /> Download Fortune Card
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='flex items-center text-xl font-bold'>
            <MessageCircle className='mr-2' />
            Ask the Digital Oracle
          </CardTitle>
          <CardDescription>
            Inquire about your tech aura, browser choice, or lucky accessories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAskQuestion}>
            <fieldset disabled={isPending} className='flex mb-4 space-x-2'>
              <Input
                type='text'
                placeholder='Ask your question...'
                required
                name='prompt'
                className='flex-grow'
              />
              <Button type='submit'>
                {isPending ? (
                  <>
                    <Spinner /> Asking...
                  </>
                ) : (
                  <Zap className='w-4 h-4' />
                )}
              </Button>
            </fieldset>
          </form>
          <AnimatePresence>
            {answer && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className='p-4 bg-gray-100 rounded-lg'
              >
                <p className='text-gray-800'>{answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
          {error && <p className='mt-2 text-red-500'>{error}</p>}
        </CardContent>
      </Card>
    </div>
  )
}
