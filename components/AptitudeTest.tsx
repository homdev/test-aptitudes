'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronRightIcon, ChevronLeftIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'

const questions = [
  {
    question: "L'e-réputation est :",
    options: [
      "La gestion de l'image d'une marque en ligne",
      "Une technique de publicité payante",
      "Un outil d'analyse de performance",
      "Une stratégie de communication interne"
    ]
  },
  {
    question: "Qu'est-ce qu'un call-to-action (CTA) ?",
    options: [
      "Un outil de mesure de la performance",
      "Une invitation à réaliser une action spécifique (exemple : cliquer)",
      "Un type de campagne d'acquisition payante",
      "Un outil d'automatisation marketing"
    ]
  },
  {
    question: "Quel outil est utilisé pour analyser les comportements des utilisateurs sur un site web ?",
    options: [
      "Trello",
      "Google Analytics",
      "Zoom",
      "Canva"
    ]
  },
  {
    question: "Une landing page efficace doit :",
    options: [
      "Contenir de nombreux liens externes",
      "Encourager les visiteurs à réaliser une action spécifique",
      "Avoir un design complexe",
      "Être optimisée uniquement pour le SEO"
    ]
  },
  {
    question: "Quelle plateforme est la plus utilisée pour les campagnes d'influence ?",
    options: [
      "LinkedIn",
      "TikTok",
      "Google+",
      "Slack"
    ]
  },
  {
    question: "Le marketing de contenu vise à :",
    options: [
      "Créer du contenu viral pour les réseaux sociaux",
      "Générer du contenu utile pour attirer et engager les clients",
      "Publier des annonces publicitaires payantes",
      "Optimiser le budget marketing"
    ]
  },
  {
    question: "Un KPI est un indicateur qui :",
    options: [
      "Permet de mesurer la performance d'une campagne",
      "Est utilisé pour créer du contenu visuel",
      "Indique le nombre d'utilisateurs actifs",
      "Sert à optimiser la sécurité des sites web"
    ]
  },
  {
    question: "Le Big Data permet :",
    options: [
      "De collecter et analyser de grandes quantités de données",
      "De créer des graphiques interactifs",
      "De concevoir des campagnes visuelles",
      "D'envoyer des newsletters"
    ]
  },
  {
    question: "L'objectif principal du SEM est :",
    options: [
      "Réduire les coûts marketing",
      "Obtenir du trafic organique",
      "Gagner du trafic payant via des annonces",
      "Améliorer la sécurité des sites web"
    ]
  },
  {
    question: "Qu'est-ce que le SEO ?",
    options: [
      "Search Engine Optimization",
      "Social Engagement Optimization",
      "Secure Electronic Operations",
      "Strategic Email Outreach"
    ]
  },
  {
    question: "Quelle est la première étape pour optimiser le SEO d'un site web ?",
    options: [
      "Acheter des publicités payantes",
      "Réaliser une analyse des mots-clés",
      "Créer une newsletter",
      "Optimiser les annonces sociales"
    ]
  },
  {
    question: "Que signifie CTR dans une campagne marketing digitale ?",
    options: [
      "Click Through Rate",
      "Conversion Tracking Ratio",
      "Client Target Response",
      "Customer Transaction Report"
    ]
  },
  {
    question: "L'UX (User Experience) se concentre sur :",
    options: [
      "L'apparence visuelle du site",
      "L'expérience globale de l'utilisateur",
      "La sécurité des données",
      "Le référencement payant"
    ]
  },
  {
    question: "Le marketing d'influence consiste à :",
    options: [
      "Utiliser des publicités payantes sur les moteurs de recherche",
      "Collaborer avec des influenceurs pour promouvoir une marque",
      "Créer du contenu optimisé pour les réseaux sociaux",
      "Concevoir des sites web interactifs"
    ]
  },
  {
    question: "Parmi les technologies émergentes suivantes, laquelle est la plus liée à la sécurité des transactions numériques ?",
    options: [
      "Intelligence Artificielle",
      "Blockchain",
      "SEO",
      "SEM"
    ]
  }
]

export default function AptitudeTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(''))
  const [showResults, setShowResults] = useState(false)
  const [studentName, setStudentName] = useState('')

  useEffect(() => {
    const storedInfo = localStorage.getItem('studentInfo')
    if (storedInfo) {
      const { firstName, lastName } = JSON.parse(storedInfo)
      setStudentName(`${firstName} ${lastName}`)
    }
  }, [])

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answer
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (showResults) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Test terminé !</h2>
        <p>Merci d'avoir complété le test, {studentName}. Vos réponses ont été enregistrées.</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <Link href="/">
          <Button variant="outline" size="sm">
            <ChevronLeftIcon className="mr-2 h-4 w-4" />
            Retour
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-center text-purple-700">
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
      >
        <h2 className="text-xl font-semibold mb-4">
          Question {currentQuestion + 1} : {questions[currentQuestion].question}
        </h2>

        <RadioGroup value={answers[currentQuestion]} onValueChange={handleAnswer} className="space-y-4">
          {questions[currentQuestion].options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
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
          {currentQuestion === questions.length - 1 ? 'Terminer' : 'Suivant'}
          <ChevronRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

