'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { CheckCircle2, XCircle, Brain, Trophy, ThumbsUp } from 'lucide-react'
import { scenarios } from '@/data/scenarios'
  
  

export default function InteractiveGame() {
  const [currentScenario, setCurrentScenario] = useState(0)
  const [choices, setChoices] = useState<string[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [studentId, setStudentId] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Récupérer le studentId au chargement
    const studentInfo = localStorage.getItem('studentInfo')
    if (studentInfo) {
      const { id } = JSON.parse(studentInfo)
      setStudentId(id)
    }
    console.log('Nombre total de scénarios:', scenarios.length)
  }, [])

  const handleChoice = (optionId: string) => {
    setChoices([...choices, optionId])
    setShowFeedback(true)
  }

  const handleNext = async () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1)
      setShowFeedback(false)
    } else {
      const correctAnswers = choices.filter(
        (choice, index) => choice === scenarios[index].correctAnswer
      ).length

      // Sauvegarder les résultats
      const gameResults = scenarios.map((scenario, index) => ({
        scenario: scenario.id,
        choice: choices[index],
        isCorrect: choices[index] === scenario.correctAnswer,
        feedback: scenario.options.find(opt => opt.id === choices[index])?.feedback || ''
      }))

      localStorage.setItem('gameResults', JSON.stringify(gameResults))

      try {
        if (!studentId) {
          console.error('StudentId not found')
          return
        }

        const response = await fetch('/api/results/scenario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            studentId,
            score: correctAnswers,
            totalScenarios: scenarios.length,
            choices
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to save results')
        }

        console.log('Résultats sauvegardés avec succès')
        router.push('/game-result')
      } catch (error) {
        console.error('Error saving scenario results:', error)
      }
    }
  }

  const scenario = scenarios[currentScenario]
  const selectedOption = showFeedback ? scenario.options.find(option => option.id === choices[choices.length - 1]) : null
  const isCorrect = selectedOption?.id === scenario.correctAnswer

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <motion.div
        key={currentScenario}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-purple-600" />
              <CardTitle className="text-2xl font-bold text-purple-700">
                Scénario {scenario.id} 🎯
              </CardTitle>
            </div>
            <CardDescription className="text-lg mt-2">{scenario.question}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <AnimatePresence>
                {scenario.options.map((option) => (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      onClick={() => handleChoice(option.id)}
                      className={`w-full text-left justify-start h-auto py-4 px-6 ${
                        showFeedback && option.id === scenario.correctAnswer
                          ? 'bg-green-500 hover:bg-green-600'
                          : showFeedback && option.id === choices[choices.length - 1] && option.id !== scenario.correctAnswer
                          ? 'bg-red-500 hover:bg-red-600'
                          : ''
                      }`}
                      disabled={showFeedback}
                    >
                      <span className="font-bold mr-2">{option.id}.</span> {option.text}
                      {showFeedback && option.id === scenario.correctAnswer && (
                        <CheckCircle2 className="ml-2 h-5 w-5 text-white inline" />
                      )}
                      {showFeedback && option.id === choices[choices.length - 1] && option.id !== scenario.correctAnswer && (
                        <XCircle className="ml-2 h-5 w-5 text-white inline" />
                      )}
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
          {showFeedback && selectedOption && (
            <CardFooter>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg mt-4 w-full ${
                  isCorrect ? 'bg-green-100' : 'bg-red-100'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? (
                    <>
                      <ThumbsUp className="w-5 h-5 text-green-600" />
                      <p className="font-bold text-green-700">Excellent ! 🎉</p>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-600" />
                      <p className="font-bold text-red-700">Pas tout à fait... 🤔</p>
                    </>
                  )}
                </div>
                <p>{selectedOption.feedback}</p>
              </motion.div>
            </CardFooter>
          )}
        </Card>
      </motion.div>
      {showFeedback && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Button 
            onClick={handleNext} 
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            {currentScenario < scenarios.length - 1 ? (
              <>Scénario Suivant ⏭️</>
            ) : (
              <>
                Voir les Résultats <Trophy className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </motion.div>
      )}
    </div>
  )
}

