/* eslint-disable react/no-unescaped-entities */

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronRightIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { useRouter } from 'next/navigation'
import Confetti from '@/components/ui/confetti'
import { Trophy } from 'lucide-react'
import { aptitudeQuestions } from '@/data/aptitude-questions'



export default function AptitudeTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>(new Array(aptitudeQuestions.length).fill(''))
  const [showResults, setShowResults] = useState(false)
  const [studentName, setStudentName] = useState('')
  const [score, setScore] = useState(0)
  const [studentId, setStudentId] = useState('')
  const router = useRouter()

  useEffect(() => {
    const storedInfo = localStorage.getItem('studentInfo')
    if (storedInfo) {
      const { id, firstName, lastName } = JSON.parse(storedInfo)
      setStudentId(id)
      setStudentName(`${firstName} ${lastName}`)
    }
  }, [])

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answer
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < aptitudeQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const finalScore = calculateScore()
      setScore(finalScore)
      setShowResults(true)
      saveResults(finalScore)
    }
  }

  const calculateScore = () => {
    return answers.reduce((acc, answer, index) => {
      return answer === aptitudeQuestions[index].correctAnswer ? acc + 1 : acc
    }, 0)
  }

  const saveResults = async (finalScore: number) => {
    try {
      await fetch('/api/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId,
          score: finalScore,
          totalQuestions: aptitudeQuestions.length,
          answers
        }),
      })
    } catch (error) {
      console.error('Error saving results:', error)
    }
  }

  const progress = ((currentQuestion + 1) / aptitudeQuestions.length) * 100

  if (showResults) {
    const percentage = ((score / aptitudeQuestions.length) * 100);
    const isPassing = percentage >= 50;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 relative"
        >
          {isPassing && (
            <Confetti
              options={{
                particleCount: 200,
                spread: 180,
                origin: { y: 0, x: 0.5 },
                colors: ['#4C1D95', '#2563EB', '#EC4899', '#8B5CF6'],
                startVelocity: 30,
                gravity: 0.5,
                scalar: 1.2,
                drift: 0,
                ticks: 300,
                shapes: ['circle', 'square'],
                zIndex: 100,
                disableForReducedMotion: true
              }}
              style={{
                position: 'fixed',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                pointerEvents: 'none',
                zIndex: 100
              }}
            />
          )}

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="text-center mb-8"
          >
            {isPassing ? (
              <div className="text-green-500 text-6xl mb-4">🎉</div>
            ) : (
              <div className="text-blue-500 text-6xl mb-4">💪</div>
            )}
            <h2 className="text-3xl font-bold text-purple-700 mb-2">
              Test terminé !
            </h2>
            <p className="text-gray-600">
              Merci d'avoir complété le test, {studentName}.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-50 rounded-xl p-6 mb-8"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Score final</span>
              <span className="text-2xl font-bold text-purple-700">
                {score} / {aptitudeQuestions.length}
              </span>
            </div>
            
            <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ delay: 0.6, duration: 1 }}
                className={`absolute h-full ${
                  isPassing ? 'bg-green-500' : 'bg-blue-500'
                }`}
              />
            </div>
            
            <div className="mt-2 text-right">
              <span className={`text-lg font-semibold ${
                isPassing ? 'text-green-600' : 'text-blue-600'
              }`}>
                {percentage.toFixed(2)}%
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center space-y-4"
          >
            <p className="text-gray-600 mb-6">
              {isPassing 
                ? "Félicitations ! Vous avez réussi le test avec succès ! 🌟" 
                : "Continuez vos efforts ! Vous pouvez réessayer pour améliorer votre score. 📚"}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                onClick={() => router.push('/')} 
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-xl transition-all transform hover:scale-105"
              >
                Retour à l'accueil 🏠
              </Button>

              {isPassing && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                >
                  <Button 
                    onClick={async () => {
                      try {
                        // Sauvegarder le résultat du test d'aptitude
                        await fetch('/api/results', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            score,
                            totalQuestions: aptitudeQuestions.length,
                            answers: answers,
                            studentId: studentId,
                          }),
                        });
                        // Rediriger vers le test de scénarios
                        router.push('/game');
                      } catch (error) {
                        console.error('Error saving results:', error);
                      }
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-xl transition-all transform hover:scale-105 flex items-center gap-2"
                  >
                    <Trophy className="w-5 h-5" />
                    Passer au Test de Scénarios 🎯
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="items-center mb-6">
        
        <h1 className="text-3xl font-bold text-center text-purple-700 uppercase">
          Test d'Aptitudes
        </h1>
      </div>
      <p className="text-gray-600 mb-2 text-center">Communication Digitale et E-influence</p>
      {studentName && (
        <p className="text-purple-600 mb-8 text-center font-semibold">
          Candidat : {studentName}
        </p>
      )}

      <Progress value={progress} className="mb-8" />

      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className=" mx-auto"
      >
        <h2 className="text-xl font-semibold mb-6">
          Question {currentQuestion + 1} : {aptitudeQuestions[currentQuestion].question}
        </h2>

        <RadioGroup 
          value={answers[currentQuestion]} 
          onValueChange={handleAnswer} 
          className="space-y-4"
        >
          {aptitudeQuestions[currentQuestion].options.map((option, index) => (
            <div 
              key={index} 
              className="flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RadioGroupItem 
                value={option} 
                id={`option-${index}`}
                className="w-6 h-6 border-2 border-black data-[state=checked]:bg-black data-[state=checked]:border-black"
              />
              <Label 
                htmlFor={`option-${index}`}
                className="flex-1 text-lg cursor-pointer"
              >
                {String.fromCharCode(65 + index)}. {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </motion.div>

      <div className="mt-8 flex justify-end">
        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestion]}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          {currentQuestion === aptitudeQuestions.length - 1 ? 'Terminer' : 'Suivant'}
          <ChevronRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

