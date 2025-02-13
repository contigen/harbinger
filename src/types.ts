import z from 'zod'
import { FortuneSchema } from './lib/schema'

export type UserData = {
  visitCount: number
  batteryLevel: number
  chargingStatus: boolean
  networkSpeed: string
  ISP: string
  localTime: string
}

export type TDeviceMetrics = {
  batteryLevel: number
  screenSize: string
  browserName: string
  osName: string
  cpuCores: number
  networkType: string
  isp: string
  isIncognito: boolean
}

export type Fortune = z.infer<typeof FortuneSchema> & { rarityScore: number }
