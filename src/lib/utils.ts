import { TDeviceMetrics } from '&/types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculateRarityScore = (deviceMetrics: TDeviceMetrics) => {
  let score = 0
  score += deviceMetrics.batteryLevel
  score += deviceMetrics.cpuCores * 10
  score += deviceMetrics.browserName === 'Other' ? 50 : 0
  score += deviceMetrics.osName === 'Other' ? 100 : 0
  score += deviceMetrics.networkType === 'Unknown' ? 30 : 0
  score += deviceMetrics.isIncognito ? 50 : 0

  const screenSize = deviceMetrics.screenSize.split('x')
  const screenRatio =
    Number.parseInt(screenSize[0]) / Number.parseInt(screenSize[1])
  score += Math.abs(screenRatio - 16 / 9) * 100

  return Math.floor(score)
}

export function generateComicComment(isp: string, networkType: string) {
  const comments = [
    `Looks like your ISP (${isp}) is powered by hamsters on wheels today. Hang tight!`,
    `Your ${networkType} connection is so fast, it's probably breaking the space-time continuum.`,
    `Is your ISP (${isp}) using carrier pigeons? Because your ${networkType} connection seems to think so.`,
    `Your internet from ${isp} is like a box of chocolates - you never know what speed you're gonna get!`,
    `With ${isp} and ${networkType}, you're surfing the web like it's 1999. Retro!`,
    `${isp} must be using quantum entanglement for your connection. It's both fast and slow until you observe it!`,
    `Your ${networkType} connection from ${isp} is so reliable, it's probably powered by unicorn tears.`,
    `Is your ${isp} connection trying to mimic a sloth? Because that ${networkType} speed is impressively slow!`,
  ]

  return comments[Math.floor(Math.random() * comments.length)]
}

export function getReturningUserMessage(
  firstSeenAt?: string,
  lastSeenAt?: string
) {
  if (!firstSeenAt || !lastSeenAt) {
    return 'Welcome! This might be your first time here. 🎉'
  }
  const firstVisit = new Date(firstSeenAt)
  const lastVisit = new Date(lastSeenAt)
  const now = new Date()

  const daysSinceFirstVisit = Math.floor(
    (now.getTime() - firstVisit.getTime()) / (1000 * 60 * 60 * 24)
  )
  const hoursSinceLastVisit = Math.floor(
    (now.getTime() - lastVisit.getTime()) / (1000 * 60 * 60)
  )
  if (hoursSinceLastVisit < 24) {
    return "Frequent flyer detected! Can't stay away, huh? ✨"
  }
  if (hoursSinceLastVisit > 24 * 30) {
    return "Wow, it's been a while! Long time no see! Missed us? 🤗"
  }
  if (daysSinceFirstVisit > 365) {
    return `You've been visiting for over a year! Time flies, doesn't it? 🚀`
  }
  return 'Welcome back! Ready for another round?'
}
