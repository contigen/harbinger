import 'server-only'
import prisma from './prisma'

// export default async function incrementUserVisits(visitorId: string) {
//   try {
//     const user = await prisma.user.findUnique({ where: { visitorId } })

//     if (user) {
//       const updatedUser = await prisma.user.update({
//         where: { visitorId },
//         data: { visits: user.visits + 1 },
//       })
//       return { visits: updatedUser.visits }
//     } else {
//       await prisma.user.create({ data: { visitorId } })
//       return { visits: 1 }
//     }
//   } catch (err) {
//     console.error(err)
//     return null
//   }
// }

export async function createUser(fingerprintId: string) {
  return prisma.user.create({
    data: { fingerprintId },
  })
}

export async function getUser(fingerprintId: string) {
  return prisma.user.findUnique({
    where: { fingerprintId },
    include: {
      fortunes: true,
      badges: {
        include: {
          badge: true,
        },
      },
    },
  })
}

export async function incrementUserVisits(fingerprintId: string) {
  return prisma.user.update({
    where: { fingerprintId },
    data: {
      visits: { increment: 1 },
    },
  })
}

// Fortune Operations
export async function createFortune(fingerprintId: string, text: string) {
  return prisma.fortune.create({
    data: {
      text,
      fingerprintId,
    },
  })
}

export async function getUserFortunes(fingerprintId: string) {
  return prisma.fortune.findMany({
    where: { fingerprintId },
    orderBy: { createdAt: 'desc' },
  })
}

// Badge Operations
export async function createBadge(data: {
  name: string
  description: string
  iconUrl: string
  conditions: string
}) {
  return prisma.badge.create({ data })
}

export async function getAllBadges() {
  return prisma.badge.findMany()
}

export async function getBadge(id: string) {
  return prisma.badge.findUnique({
    where: { id },
  })
}

// UserBadge Operations
export async function awardBadgeToUser(fingerprintId: string, badgeId: string) {
  return prisma.userBadge.create({
    data: {
      fingerprintId,
      badgeId,
    },
  })
}

export async function getUserBadges(fingerprintId: string) {
  return prisma.userBadge.findMany({
    where: { fingerprintId },
    include: {
      badge: true,
    },
  })
}

// EasterEgg Operations
export async function createEasterEgg(data: {
  trigger: string
  message: string
  collectible: boolean
}) {
  return prisma.easterEgg.create({ data })
}

export async function findEasterEggByTrigger(trigger: string) {
  return prisma.easterEgg.findUnique({
    where: { trigger },
  })
}

export async function getAllEasterEggs() {
  return prisma.easterEgg.findMany()
}

export async function getUserStats(fingerprintId: string) {
  const user = await prisma.user.findUnique({
    where: { fingerprintId },
    include: {
      _count: {
        select: {
          fortunes: true,
          badges: true,
        },
      },
    },
  })

  return {
    visits: user?.visits || 0,
    fortuneCount: user?._count.fortunes || 0,
    badgeCount: user?._count.badges || 0,
    joinedAt: user?.createdAt,
  }
}

export async function getLeaderboard() {
  return prisma.user.findMany({
    select: {
      fingerprintId: true,
      visits: true,
      _count: {
        select: {
          badges: true,
          fortunes: true,
        },
      },
    },
    orderBy: [{ badges: { _count: 'desc' } }, { visits: 'desc' }],
    take: 10,
  })
}
