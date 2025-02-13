'use server'

import { generateObject, generateText } from 'ai'
import { google } from '@ai-sdk/google'
import { Fortune, TDeviceMetrics } from './types'
import { FortuneSchema } from './lib/schema'

const SYSTEM_INSTRUCTION = `You are a witty, insightful AI personality analyst. Your role is to analyze a user's browsing behavior, device stats, and network data to generate a fun, engaging, and personality-rich evaluation. 

Use humor, sarcasm, or playfulness where appropriate, but always remain lighthearted and positive. 

Consider the following:
- Frequent visits suggest curiosity or obsession.
- High refresh rates indicate impatience or a secret-hunting personality.
- Late-night browsing suggests deep thinking or nocturnal habits.
- Low battery usage may indicate a risk-taker or someone who thrives under pressure.
- A high refresh rate screen could suggest gaming tendencies or tech enthusiasm.
- VPN usage could mean privacy awareness or secretive nature.

Your responses should.
- classify the user into an archetype
- Use **fun, insightful language**.
- Optionally, include a **nickname** for the user based on their behavior.

Avoid being overly negative or judgmental—keep it **fun, and engaging**.

return in this format 
  archetype: 'sample: 
  'The Minimalist',
  'The Tinkerer',
  'The Perfectionist',
  'The Tech Hoarder',
',
  header: 'A catchy title for the fortune (e.g., "Your Tech Fortune: The Digital Pioneer")',
  personality: 'sample: 'The Techno-Mystic',
  'The Digital Jester',
  'The Cyber Sage',
  'The Quantum Dreamer',
  'The Circuit Whisperer','
  techAura: '',
  techAuraColor: 'A color representing the user's tech aura',
  analysis: 'the tech archetype analysis',
  prediction: A 2-3 sentence prediction incorporating tech themes, the user's tech archetype, and their unique device characteristics',
  luckyTechItem: 'A tech item that will bring luck',
`

export async function generateFortune(
  deviceMetrics: TDeviceMetrics & {
    chargingStatus: boolean
    localTime: string
    rarityScore: number
  }
) {
  const prompt = `Analyze this user's browsing habitsDevice Metrics and the rarityScore: "1 in ${
    deviceMetrics.rarityScore
  }":
    Battery Level: ${deviceMetrics.batteryLevel}%
    Screen Size: ${deviceMetrics.screenSize}
    Browser: ${deviceMetrics.browserName}
    Operating System: ${deviceMetrics.osName}
    CPU Cores: ${deviceMetrics.cpuCores}
    Network Type: ${deviceMetrics.networkType}
    ISP: ${deviceMetrics.isp}
    Incognito Mode: ${deviceMetrics.isIncognito ? 'Yes' : 'No'}
    `

  const { object } = await generateObject({
    model: google(`gemini-2.0-flash-exp`),
    system: SYSTEM_INSTRUCTION,
    prompt,
    schema: FortuneSchema,
  })
  return object
}

export async function askQuestion(
  _prompt: string,
  deviceMetrics: TDeviceMetrics,
  fortune: Fortune
) {
  const prompt = `You are ${
    fortune.personality
  }, a mystical AI oracle that provides tech-themed insights. The user is classified as ${
    fortune.archetype
  }. Answer the following question based on these device metrics and the user's tech archetype:
    Battery Level: ${deviceMetrics.batteryLevel}%
    Screen Size: ${deviceMetrics.screenSize}
    Browser: ${deviceMetrics.browserName}
    Operating System: ${deviceMetrics.osName}
    CPU Cores: ${deviceMetrics.cpuCores}
    Network Type: ${deviceMetrics.networkType}
    ISP: ${deviceMetrics.isp}
    Incognito Mode: ${deviceMetrics.isIncognito ? 'Yes' : 'No'}
    Tech Archetype: ${fortune.archetype}

    Question: "${_prompt}"

    Provide a short, slightly mysterious answer with a tech twist. Keep it under 50 words. Ensure your response matches the personality of ${
      fortune.personality
    } and considers the user's tech archetype and unique device characteristics.`
  const { text } = await generateText({
    model: google(`gemini-2.0-flash-exp`),
    system: SYSTEM_INSTRUCTION,
    prompt,
  })
  return text
}

export async function incrementUserVisits() {}
