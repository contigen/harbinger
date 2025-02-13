'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MessageSquare } from 'lucide-react'
import { generateComicComment } from '&/lib/utils'

interface ComicCommentsProps {
  isp: string
  networkType: string
}

const ComicComments: React.FC<ComicCommentsProps> = ({ isp, networkType }) => {
  const [comment, setComment] = React.useState('')

  React.useEffect(() => {
    setComment(generateComicComment(isp, networkType))
  }, [isp, networkType])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='p-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg'
    >
      <h3 className='flex items-center mb-4 text-xl font-bold text-white'>
        <MessageSquare className='mr-2' />
        Tech Humor Central
      </h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className='text-lg text-white'
      >
        {comment}
      </motion.p>
    </motion.div>
  )
}

export default ComicComments
