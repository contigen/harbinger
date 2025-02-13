'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import DeviceMetrics from './DeviceMetrics'
import BadgeCollection from './BadgeCollection'
import EasterEggZone from './EasterEggZone'
import FortuneHistory from './FortuneHistory'
import AIFortuneAnalysis from './AIFortuneAnalysis'
import { ShareModal } from './ShareModal'
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'
import { Fortune, TDeviceMetrics } from '&/types'
import Greeting from './Greeting'
import ComicComments from './ComicComments'

export default function Dashboard() {
  const { data } = useVisitorData({ extendedResult: true }, { immediate: true })
  const [deviceMetrics, setDeviceMetrics] = useState<TDeviceMetrics>({
    batteryLevel: 0,
    screenSize: '',
    browserName: data?.browserName || '',
    osName: data?.os || '',
    cpuCores: 0,
    networkType: '',
    isp: '',
    isIncognito: data?.incognito || false,
  })
  const [badges, setBadges] = useState(['early_adopter'])
  const [fortuneImage, setFortuneImage] = useState<string | null>(null)
  const [fortuneHistory, setFortuneHistory] = useState<Fortune[]>([])
  const [fortune, setFortune] = useState<Fortune | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      try {
        const battery = await (
          navigator as Navigator & { getBattery(): Promise<{ level: number }> }
        ).getBattery()
        const connection =
          (
            navigator as Navigator & {
              connection?: { effectiveType: string }
              mozConnection?: { effectiveType: string }
              webkitConnection?: { effectiveType: string }
            }
          ).connection ||
          (
            navigator as Navigator & {
              connection?: { effectiveType: string }
              mozConnection?: { effectiveType: string }
              webkitConnection?: { effectiveType: string }
            }
          ).mozConnection ||
          (
            navigator as Navigator & {
              connection?: { effectiveType: string }
              mozConnection?: { effectiveType: string }
              webkitConnection?: { effectiveType: string }
            }
          ).webkitConnection
        const geoResponse = await fetch(`https://ipapi.co/${data?.ip}/json/`)
        const geoData = await geoResponse.json()
        const metrics = {
          batteryLevel: Math.floor(battery.level * 100),
          screenSize: `${window.innerWidth}x${window.innerHeight}`,
          browserName: data?.browserName || '',
          osName: data?.os || '',
          cpuCores: navigator.hardwareConcurrency || 'Unknown',
          networkType: connection ? connection.effectiveType : 'Unknown',
          geolocation: null,
          isp: geoData.org,
          isIncognito: data?.incognito || false,
        }
        const metricsWithNumberCores = {
          ...metrics,
          cpuCores: typeof metrics.cpuCores === 'string' ? 0 : metrics.cpuCores,
        }
        setDeviceMetrics(metricsWithNumberCores)
      } catch {
        setDeviceMetrics({
          batteryLevel: 0,
          screenSize: `${window.innerWidth}x${window.innerHeight}`,
          browserName: data?.browserName || '',
          osName: data?.os || '',
          cpuCores: navigator.hardwareConcurrency || 0,
          networkType: 'Unknown',
          isp: '',
          isIncognito: false,
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchDeviceInfo()
  }, [data?.browserName, data?.incognito, data?.ip, data?.os])

  const unlockBadge = (badgeName: string) => {
    if (!badges.includes(badgeName)) {
      setBadges(prev => [...prev, badgeName])
    }
  }

  const addToFortuneHistory = (fortune: Fortune) => {
    setFortuneHistory(prev => [...prev, fortune])
  }

  if (isLoading) {
    return <div className='text-center'>Loading your digital destiny...</div>
  }

  return (
    <div className='p-4 min-h-screen bg-gray-900'>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='mx-auto space-y-8 max-w-4xl'
      >
        <Greeting />
        <AIFortuneAnalysis
          deviceMetrics={deviceMetrics}
          setFortune={setFortune}
          addToFortuneHistory={addToFortuneHistory}
          fortuneImage={fortuneImage}
          setFortuneImage={setFortuneImage}
        />
        <div className='flex justify-center'>
          <ShareModal fortune={fortune} fortuneImage={fortuneImage} />
        </div>
        <DeviceMetrics metrics={deviceMetrics} />
        <ComicComments
          isp={deviceMetrics.isp}
          networkType={deviceMetrics.networkType}
        />
        <BadgeCollection badges={badges} />
        <EasterEggZone unlockBadge={unlockBadge} />
        <FortuneHistory history={fortuneHistory} />
      </motion.div>
    </div>
  )
}
