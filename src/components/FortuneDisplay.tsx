import { motion } from "framer-motion"
import { Sparkles, Keyboard, Palette } from "lucide-react"

interface FortuneDisplayProps {
  fortune: {
    header: string
    prediction: string
    luckyTechItem: string
    techAuraColor: string
    rarityScore: string
  }
  quirkMessage: string
}

export default function FortuneDisplay({ fortune, quirkMessage }: FortuneDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 p-8 rounded-lg shadow-lg mb-8 border border-blue-500"
    >
      <h2 className="text-3xl font-bold mb-6 text-blue-400 flex items-center">
        <Sparkles className="mr-2" />
        {fortune.header}
      </h2>
      <div className="space-y-4">
        <p className="text-xl text-gray-200 leading-relaxed">{fortune.prediction}</p>
        <div className="flex items-center">
          <Keyboard className="mr-2 text-yellow-400" />
          <span className="text-gray-300">Lucky Tech Item: </span>
          <span className="ml-2 font-semibold text-yellow-400">{fortune.luckyTechItem}</span>
        </div>
        <div className="flex items-center">
          <Palette className="mr-2 text-purple-400" />
          <span className="text-gray-300">Tech Aura Color: </span>
          <span className="ml-2 font-semibold text-purple-400">{fortune.techAuraColor}</span>
        </div>
        <div className="text-gray-300">
          Rarity Score: <span className="font-semibold text-green-400">{fortune.rarityScore}</span>
        </div>
      </div>
      <p className="mt-6 text-md text-blue-300 italic">{quirkMessage}</p>
    </motion.div>
  )
}

