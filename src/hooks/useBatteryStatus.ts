import { useEffect, useState } from 'react'

interface BatteryManager extends EventTarget {
  charging: boolean
  chargingTime: number
  dischargingTime: number
  level: number
  addEventListener(
    type: 'chargingchange' | 'levelchange',
    listener: EventListener
  ): void
  removeEventListener(
    type: 'chargingchange' | 'levelchange',
    listener: EventListener
  ): void
}

interface NavigatorWithBattery extends Navigator {
  getBattery(): Promise<BatteryManager>
}

type BatteryStatus = {
  level: number | null
  charging: boolean | null
}

export function useBatteryStatus(): BatteryStatus {
  const [battery, setBattery] = useState<BatteryStatus>({
    level: null,
    charging: null,
  })

  useEffect(() => {
    let batteryManager: BatteryManager | null = null

    function updateBatteryStatus(battery: BatteryManager) {
      setBattery({
        level: battery.level,
        charging: battery.charging,
      })
    }

    async function initBattery() {
      if (!('getBattery' in navigator)) return

      try {
        batteryManager = await (navigator as NavigatorWithBattery).getBattery()
        updateBatteryStatus(batteryManager)

        const handleLevelChange = () => {
          if (batteryManager) updateBatteryStatus(batteryManager)
        }

        const handleChargingChange = () => {
          if (batteryManager) updateBatteryStatus(batteryManager)
        }

        batteryManager.addEventListener('levelchange', handleLevelChange)
        batteryManager.addEventListener('chargingchange', handleChargingChange)

        return () => {
          if (batteryManager) {
            batteryManager.removeEventListener('levelchange', handleLevelChange)
            batteryManager.removeEventListener(
              'chargingchange',
              handleChargingChange
            )
          }
        }
      } catch (error) {
        console.error('Battery status API not supported:', error)
      }
    }

    initBattery()
  }, [])

  return battery
}
