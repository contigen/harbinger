'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { Input } from '&/components/ui/input'
import { Fortune } from '&/types'
import { Badge } from './ui/badge'

interface FortuneHistoryProps {
  history: Array<Fortune>
}

export default function FortuneHistory({ history }: FortuneHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredHistory = history.filter(item =>
    item.header.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className='p-6 mt-8 bg-gray-800 rounded-lg border border-blue-500 shadow-lg'
    >
      <h2 className='mb-6 text-2xl font-bold text-blue-400'>Fortune History</h2>
      <div className='relative mb-4'>
        <Input
          type='text'
          placeholder='Search fortunes...'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className='pl-10'
        />
        <Search className='absolute left-3 top-1/2 text-gray-400 transform -translate-y-1/2' />
      </div>
      <div className='space-y-4'>
        {filteredHistory.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className='p-4 bg-gray-700 rounded-lg'
          >
            <section className='flex justify-between my-1 text-white'>
              <Badge>{item.archetype}</Badge> {item.personality}
            </section>
            <span>{item.header}</span>
            <p className='text-gray-300'>{item.prediction}</p>
          </motion.div>
        ))}
      </div>
      {filteredHistory.length === 0 && (
        <p className='mt-4 text-gray-400'>
          No fortunes found matching your search.
        </p>
      )}
    </motion.div>
  )
}
