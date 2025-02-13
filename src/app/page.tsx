'use client'

import { useState } from 'react'
import LandingPage from '../components/LandingPage'
import Dashboard from '../components/Dashboard'

export default function Home() {
  const [showDashboard, setShowDashboard] = useState(false)

  return (
    <main className='min-h-screen'>
      {showDashboard ? (
        <Dashboard />
      ) : (
        <LandingPage onReveal={() => setShowDashboard(true)} />
      )}
    </main>
  )
}
