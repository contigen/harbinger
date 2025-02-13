import z from 'zod'

export const UserMetricsSchema = z.object({
  visitCount: z.number().min(0).default(1),
  sessionDuration: z.number().min(0).default(0),
  clickPatterns: z.array(z.string()).default([]),
  refreshRate: z.number().min(0).default(0),
  batteryLevel: z.number().min(0).max(100).default(100),
  chargingStatus: z.boolean().default(false),
  screenRefreshRate: z.number().min(30).max(240).default(60),
  networkSpeed: z.string().default('Unknown'),
  ISP: z.string().default('Unknown ISP'),
  easterEggTriggers: z.array(z.string()).default([]),
})

export const PersonalityResponseSchema = z.object({
  archetype: z.string(),
  nickname: z.string().optional(),
  analysis: z.string(),
  traits: z.array(z.string()),
  easterEggMention: z.string().optional(),
})

export const FortuneSchema = z.object({
  archetype: z.string(),
  header: z.string(),
  personality: z.string(),
  techAura: z.string(),
  techAuraColor: z.string(),
  analysis: z.string(),
  prediction: z.string(),
  luckyTechItem: z.string(),
})
