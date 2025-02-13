"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Bot } from "lucide-react"
import { Button } from "&/components/ui/button"
import { Input } from "&/components/ui/input"

interface AIChatInsightsProps {
  onAskQuestion: (question: string) => Promise<string>
  personality: string
}

export default function AIChatInsights({ onAskQuestion, personality }: AIChatInsightsProps) {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleAskQuestion = async () => {
    if (question.trim() === "") return

    setIsLoading(true)
    try {
      const response = await onAskQuestion(question)
      setAnswer(response)
    } catch (error) {
      console.error("Error asking question:", error)
      setAnswer("Oops! The digital spirits are a bit confused. Try asking again later.")
    }
    setIsLoading(false)
    setQuestion("")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 border border-blue-500"
    >
      <h3 className="text-2xl font-bold mb-4 text-blue-400 flex items-center">
        <Bot className="mr-2" />
        Digital Oracle Insights
      </h3>
      <p className="text-gray-300 mb-4">AI Personality: {personality}</p>
      <div className="mb-4">
        <p className="text-gray-300 mb-2">Ask the Digital Oracle for deeper insights:</p>
        <ul className="list-disc list-inside text-gray-400 space-y-1">
          <li>"What does my setup say about me?"</li>
          <li>"Which digital spirit guides me?"</li>
          <li>"What's my next lucky gadget?"</li>
        </ul>
      </div>
      <div className="flex space-x-2 mb-4">
        <Input
          type="text"
          placeholder="Ask your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-grow"
          onKeyPress={(e) => e.key === "Enter" && handleAskQuestion()}
        />
        <Button onClick={handleAskQuestion} disabled={isLoading}>
          {isLoading ? "Asking..." : <Send className="w-4 h-4" />}
        </Button>
      </div>
      {answer && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-700 p-4 rounded-lg"
        >
          <p className="text-gray-200">{answer}</p>
        </motion.div>
      )}
    </motion.div>
  )
}

