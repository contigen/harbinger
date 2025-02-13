import type React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Battery, Smartphone, Globe, Cpu, Wifi, Monitor } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '&/components/ui/tooltip'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '&/components/ui/dialog'
import { TDeviceMetrics } from '&/types'

export default function DeviceMetrics({
  metrics,
}: {
  metrics: TDeviceMetrics
}) {
  const [openDialog, setOpenDialog] = useState<string | null>(null)

  const renderMetric = (
    icon: React.ReactNode,
    label: string,
    value: string | number,
    tooltip: string,
    detailedInfo: string
  ) => (
    <Dialog
      open={openDialog === label}
      onOpenChange={open => setOpenDialog(open ? label : null)}
    >
      <TooltipProvider>
        <Tooltip>
          <DialogTrigger asChild>
            <TooltipTrigger asChild>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='flex items-center p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600'
              >
                <div className='mr-4 text-blue-400'>{icon}</div>
                <div>
                  <p className='text-sm text-gray-400'>{label}</p>
                  <p className='text-lg font-semibold'>{value}</p>
                </div>
              </motion.div>
            </TooltipTrigger>
          </DialogTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
        </DialogHeader>
        <p>{detailedInfo}</p>
      </DialogContent>
    </Dialog>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className='p-6 mb-8 bg-gray-800 rounded-lg border border-blue-500 shadow-lg'
    >
      <h2 className='mb-6 text-2xl font-bold text-blue-400'>Device Insights</h2>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        {renderMetric(
          <Battery className='w-6 h-6' />,
          'Battery Level',
          `${metrics.batteryLevel}%`,
          'Your battery level affects your digital aura',
          `Your device's battery is currently at ${metrics.batteryLevel}%.`
        )}
        {renderMetric(
          <Smartphone className='w-6 h-6' />,
          'Screen Size',
          metrics.screenSize,
          'Your screen size influences your digital perspective',
          `Your screen size is ${metrics.screenSize}.`
        )}
        {renderMetric(
          <Globe className='w-6 h-6' />,
          'Browser',
          metrics.browserName,
          'Your browser choice shapes your online journey',
          `You're using ${metrics.browserName}.`
        )}
        {renderMetric(
          <Cpu className='w-6 h-6' />,
          'CPU Cores',
          metrics.cpuCores,
          'More cores mean more parallel destinies',
          `Your device has ${metrics.cpuCores} CPU cores.`
        )}
        {renderMetric(
          <Wifi className='w-6 h-6' />,
          'Network Type',
          metrics.networkType,
          'Your connection defines your digital reach',
          `Your current network type is ${metrics.networkType}.`
        )}
        {renderMetric(
          <Monitor className='w-6 h-6' />,
          'Operating System',
          metrics.osName,
          'Your OS shapes your digital foundation',
          `Your device runs on ${metrics.osName}.`
        )}
      </div>
    </motion.div>
  )
}
