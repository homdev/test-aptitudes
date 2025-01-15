/* eslint-disable react/no-unescaped-entities */

'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Trophy, Star, Home, Sparkles, CheckCircle2, XCircle } from 'lucide-react'

interface GameResult {
  scenario: number
  choice: string
  isCorrect: boolean
  feedback: string
}

export default function GameResultsPage() {
  const [results, setResults] = useState<GameResult[]>([])
  const [score, setScore] = useState(0)

  useEffect(() => {
    const storedResults = localStorage.getItem('gameResults')
    const studentInfo = localStorage.getItem('studentInfo')
    
    if (storedResults && studentInfo) {
      const parsedResults = JSON.parse(storedResults)
      console.log('Nombre de résultats chargés:', parsedResults.length)
      
      const allResults = parsedResults.map((result: GameResult, index: number) => ({
        scenario: result.scenario || index + 1,
        choice: result.choice || '',
        isCorrect: result.isCorrect || false,
        feedback: result.feedback || ''
      }))

      setResults(allResults)
      setScore(allResults.filter((r: GameResult) => r.isCorrect).length)
    }
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            </motion.div>
            <CardTitle className="text-4xl font-bold text-purple-700 flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6" />
              Félicitations ! 🎉
              <Sparkles className="w-6 h-6" />
            </CardTitle>
            <CardDescription className="text-xl mt-2">
              Score Final: {score}/{results.length} 🏆
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-4">
              <AnimatePresence>
                {results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg ${
                      result.isCorrect ? 'bg-green-100' : 'bg-red-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {result.isCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600" />
                      )}
                      <div>
                        <h3 className="font-bold">
                          Scénario {result.scenario} {result.isCorrect ? '✨' : '💭'}
                        </h3>
                        <p className="text-sm mt-1">{result.feedback}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Link href="/">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2">
                <Home className="w-4 h-4" />
                Retour à l'accueil 🏠
              </Button>
            </Link>
            <Link href="/test">
              <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">
                <Star className="w-4 h-4" />
                Relancer 🔄
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </main>
  )
}

