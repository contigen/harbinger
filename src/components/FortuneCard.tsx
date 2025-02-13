import React, { useEffect, useState } from 'react'
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'
import { Spinner } from './ui/spinner'

const FortuneCard = () => {
  const [fortune, setFortune] = useState<string>('Fetching your fortune...')
  const [easterEgg, setEasterEgg] = useState<string | null>(null)
  const [comicComment, setComicComment] = useState<string | null>(null)
  const [networkInfo, setNetworkInfo] = useState<string>('Detecting network...')
  const { isLoading, error, data } = useVisitorData(
    { extendedResult: true },
    { immediate: true }
  )

  //   const data = await response.json();
  //       const visitCount = data.visits || 1;

  //       const visitMessages: Record<number, string> = {
  //         1: "🎉 Welcome, new traveler! Your journey begins...",
  //         2: "👀 Back so soon? Something caught your eye?",
  //         5: "🔥 Five visits! You're becoming a regular!",
  //         10: "🚀 Wow! 10 visits! You're a VIP now!",
  //       };

  //       setEasterEgg(visitMessages[visitCount] || `🌟 Visit #${visitCount}! Thanks for coming back!`);
  //     };

  useEffect(() => {
    const fetchUserData = async () => {
      const result = data

      const browser = result.browserName || 'Unknown Browser'
      const os = result.os || 'Unknown OS'
      const ipLocation = result.components.ipLocation?.value || 'Mystery Land'
      const incognito = result.components.incognito.value || false

      // Generate Fortune
      const browserFortunes: Record<string, string> = {
        Chrome: 'Speed is your ally today! Make quick decisions.',
        Firefox: 'Your adventurous spirit will lead to something new!',
        Safari: 'Elegance and precision are your strengths today.',
        Edge: 'Trust your instincts, but don’t be afraid to explore.',
        Unknown: 'The universe has a surprise for you...',
      }

      const osMessages: Record<string, string> = {
        Windows: 'A productive day ahead! Seize the opportunity.',
        Mac: 'Your creativity will shine today!',
        Linux: 'A problem-solving challenge is on the horizon.',
        Unknown: 'Mystery awaits those who seek knowledge.',
      }

      setFortune(
        `🔮 ${browserFortunes[browser] || browserFortunes['Unknown']} 
         🌍 Location: ${ipLocation}
         💻 OS: ${osMessages[os] || osMessages['Unknown']}`
      )

      // Easter Egg (Incognito Mode)
      if (incognito) {
        setEasterEgg('🕵️‍♂️ Hiding in the shadows? The truth always finds you...')
      }

      // Fetch ISP & Country
      fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
          const isp = data.org || 'Unknown ISP'
          const country = data.country_name || 'Unknown Country'

          const ispComments: Record<string, string> = {
            'MTN Nigeria':
              '📡 MTN detected! Hope the network is stable today...',
            'Airtel Nigeria':
              '📶 Airtel user spotted! Network boost incoming? 🤞',
            'Glo Nigeria': '🐢 Slow and steady? Hang in there!',
            '9mobile Nigeria': '📞 9mobile? Expect the unexpected!',
            'AT&T': '📡 AT&T detected! Classic American connectivity. 🇺🇸',
            Verizon: '📶 Verizon user! Enjoy that strong signal. 📡',
            'T-Mobile': '🚀 T-Mobile detected! Pink waves incoming! 🌸',
            Vodafone: '📡 Vodafone user spotted! International waves ahead. 🌍',
            Orange: '🟠 Orange network? France, we see you! 🇫🇷',
            'BT Group': '📡 BT? British connectivity at its finest! 🇬🇧',
            'Deutsche Telekom':
              '🇩🇪 German precision detected! Fast speeds ahead!',
            Jio: '📱 Jio user! Internet on steroids? 💨',
            'Unknown ISP': '🔌 A mystery provider! Are you in the Matrix?',
          }

          setComicComment(
            `${
              ispComments[isp] || '🚀 Your ISP is working hard!'
            } 🌍 Country: ${country}`
          )
        })

      // Network Speed & Type Detection (Network API)
      if ('connection' in navigator) {
        const connection = (navigator as any).connection
        const speedMbps = connection.downlink || 0
        const networkType = connection.effectiveType || 'Unknown'

        let speedComment = '📉 Your internet speed is a mystery...'
        if (speedMbps > 10) {
          speedComment = '🚀 Blazing fast! Streaming heaven! 🎬'
        } else if (speedMbps > 5) {
          speedComment = '📡 Decent speed! Good enough for work & play.'
        } else if (speedMbps > 1) {
          speedComment = '🐢 Not bad, but could be better.'
        } else {
          speedComment = '💀 Your internet is slower than a snail...'
        }

        setNetworkInfo(
          `📡 Connection: ${networkType.toUpperCase()} (${speedMbps} Mbps) ${speedComment}`
        )
      } else {
        setNetworkInfo('⚠️ Network API not supported in this browser.')
      }
    }

    fetchUserData()
  }, [])

  if (isLoading)
    return (
      <div>
        <Spinner strokeColor='#000' />
        Getting user fortune and prediction
      </div>
    )

  return (
    <div className='p-4 bg-white shadow-lg rounded-lg max-w-md mx-auto text-center'>
      <h2 className='text-xl font-bold'>Your Fortune Card</h2>
      <p className='mt-2'>{fortune}</p>
      {easterEgg && <p className='mt-2 text-blue-500'>{easterEgg}</p>}
      {comicComment && <p className='mt-2 text-green-500'>{comicComment}</p>}
      <p className='mt-2 text-orange-500'>{networkInfo}</p>
    </div>
  )
}
