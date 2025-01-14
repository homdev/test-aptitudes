/* eslint-disable react/no-unescaped-entities */

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronRightIcon, ChevronLeftIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const questions = [
  {
    question: "L'e-réputation est :",
    options: [
      "La gestion de l'image d'une marque en ligne",
      "Une technique de publicité payante",
      "Un outil d'analyse de performance",
      "Une stratégie de communication interne"
    ],
    correctAnswer: "La gestion de l'image d'une marque en ligne"
  },
  {
    question: "Qu'est-ce qu'un call-to-action (CTA) ?",
    options: [
      "Un outil de mesure de la performance",
      "Une invitation à réaliser une action spécifique (exemple : cliquer)",
      "Un type de campagne d'acquisition payante",
      "Un outil d'automatisation marketing"
    ],
    correctAnswer: "Une invitation à réaliser une action spécifique (exemple : cliquer)"
  },
  {
    question: "Quel outil est utilisé pour analyser les comportements des utilisateurs sur un site web ?",
    options: [
      "Trello",
      "Google Analytics",
      "Zoom",
      "Canva"
    ],
    correctAnswer: "Google Analytics"
  },
  {
    question: "Une landing page efficace doit :",
    options: [
      "Contenir de nombreux liens externes",
      "Encourager les visiteurs à réaliser une action spécifique",
      "Avoir un design complexe",
      "Être optimisée uniquement pour le SEO"
    ],
    correctAnswer: "Encourager les visiteurs à réaliser une action spécifique"
  },
  {
    question: "Quelle plateforme est la plus utilisée pour les campagnes d'influence ?",
    options: [
      "LinkedIn",
      "TikTok",
      "Google+",
      "Slack"
    ],
    correctAnswer: "TikTok"
  },
  {
    question: "Le marketing de contenu vise à :",
    options: [
      "Créer du contenu viral pour les réseaux sociaux",
      "Générer du contenu utile pour attirer et engager les clients",
      "Publier des annonces publicitaires payantes",
      "Optimiser le budget marketing"
    ],
    correctAnswer: "Générer du contenu utile pour attirer et engager les clients"
  },
  {
    question: "Un KPI est un indicateur qui :",
    options: [
      "Permet de mesurer la performance d'une campagne",
      "Est utilisé pour créer du contenu visuel",
      "Indique le nombre d'utilisateurs actifs",
      "Sert à optimiser la sécurité des sites web"
    ],
    correctAnswer: "Permet de mesurer la performance d'une campagne"
  },
  {
    question: "Le Big Data permet :",
    options: [
      "De collecter et analyser de grandes quantités de données",
      "De créer des graphiques interactifs",
      "De concevoir des campagnes visuelles",
      "D'envoyer des newsletters"
    ],
    correctAnswer: "De collecter et analyser de grandes quantités de données"
  },
  {
    question: "L'objectif principal du SEM est :",
    options: [
      "Réduire les coûts marketing",
      "Obtenir du trafic organique",
      "Gagner du trafic payant via des annonces",
      "Améliorer la sécurité des sites web"
    ],
    correctAnswer: "Gagner du trafic payant via des annonces"
  },
  {
    question: "Qu'est-ce que le SEO ?",
    options: [
      "Search Engine Optimization",
      "Social Engagement Optimization",
      "Secure Electronic Operations",
      "Strategic Email Outreach"
    ],
    correctAnswer: "Search Engine Optimization"
  },
  {
    question: "Quelle est la première étape pour optimiser le SEO d'un site web ?",
    options: [
      "Acheter des publicités payantes",
      "Réaliser une analyse des mots-clés",
      "Créer une newsletter",
      "Optimiser les annonces sociales"
    ],
    correctAnswer: "Réaliser une analyse des mots-clés"
  },
  {
    question: "Que signifie CTR dans une campagne marketing digitale ?",
    options: [
      "Click Through Rate",
      "Conversion Tracking Ratio",
      "Client Target Response",
      "Customer Transaction Report"
    ],
    correctAnswer: "Click Through Rate"
  },
  {
    question: "L'UX (User Experience) se concentre sur :",
    options: [
      "L'apparence visuelle du site",
      "L'expérience globale de l'utilisateur",
      "La sécurité des données",
      "Le référencement payant"
    ],
    correctAnswer: "L'expérience globale de l'utilisateur"
  },
  {
    question: "Le marketing d'influence consiste à :",
    options: [
      "Utiliser des publicités payantes sur les moteurs de recherche",
      "Collaborer avec des influenceurs pour promouvoir une marque",
      "Créer du contenu optimisé pour les réseaux sociaux",
      "Concevoir des sites web interactifs"
    ],
    correctAnswer: "Collaborer avec des influenceurs pour promouvoir une marque"
  },
  {
    question: "Parmi les technologies émergentes suivantes, laquelle est la plus liée à la sécurité des transactions numériques ?",
    options: [
      "Intelligence Artificielle",
      "Blockchain",
      "SEO",
      "SEM"
    ],
    correctAnswer: "Blockchain"
  },
  {
    question: "Quel est le rôle principal d'un CRM (Customer Relationship Management) ?",
    options: [
      "Automatiser les publicités sur les réseaux sociaux",
      "Gérer les relations et les interactions avec les clients",
      "Créer des campagnes publicitaires",
      "Optimiser les performances des sites web"
    ],
    correctAnswer: "Gérer les relations et les interactions avec les clients"
  },
  {
    question: "Le terme 'Mobile First' désigne :",
    options: [
      "L'optimisation des campagnes sur les réseaux sociaux",
      "La priorité donnée à la conception pour les appareils mobiles",
      "La création d'applications dédiées",
      "L'analyse des performances mobiles"
    ],
    correctAnswer: "La priorité donnée à la conception pour les appareils mobiles"
  },
  {
    question: "Quelle stratégie est la plus efficace pour un lancement rapide de produit ?",
    options: [
      "SEO",
      "SEM",
      "Marketing d'influence",
      "Emailing"
    ],
    correctAnswer: "SEM"
  },
  {
    question: "Quel est le principal indicateur de performance d'une landing page ?",
    options: [
      "Le temps passé sur la page",
      "Le taux de conversion",
      "Le nombre de clics sur les liens",
      "Le nombre de partages sur les réseaux sociaux"
    ],
    correctAnswer: "Le taux de conversion"
  },
  {
    question: "L'intelligence artificielle permet d'optimiser :",
    options: [
      "Les budgets publicitaires",
      "Les campagnes de contenu viral",
      "L'expérience utilisateur et la personnalisation",
      "Les relations avec les investisseurs"
    ],
    correctAnswer: "L'expérience utilisateur et la personnalisation"
  },
  {
    question: "La méthode A/B testing permet :",
    options: [
      "De tester deux variantes d'un contenu pour mesurer leur performance",
      "D'automatiser les publicités sur les réseaux sociaux",
      "De sécuriser les transactions en ligne",
      "De gérer les relations clients"
    ],
    correctAnswer: "De tester deux variantes d'un contenu pour mesurer leur performance"
  },
  {
    question: "Quel est l'avantage principal du marketing automation ?",
    options: [
      "Augmenter le budget marketing",
      "Automatiser les tâches répétitives pour gagner du temps",
      "Créer du contenu viral",
      "Optimiser la sécurité des données"
    ],
    correctAnswer: "Automatiser les tâches répétitives pour gagner du temps"
  },
  {
    question: "Le RGPD (Règlement Général sur la Protection des Données) est principalement lié :",
    options: [
      "À la création de contenu marketing",
      "À la gestion et protection des données personnelles des utilisateurs",
      "À l'analyse de performance des campagnes",
      "À l'optimisation SEO"
    ],
    correctAnswer: "À la gestion et protection des données personnelles des utilisateurs"
  },
  {
    question: "Quelle est la différence entre SEO et SEM ?",
    options: [
      "Le SEO est gratuit tandis que le SEM est payant",
      "Le SEM se concentre uniquement sur les réseaux sociaux",
      "Le SEO utilise l'intelligence artificielle, le SEM non",
      "Le SEO est destiné aux grandes entreprises, le SEM aux PME"
    ],
    correctAnswer: "Le SEO est gratuit tandis que le SEM est payant"
  },
  {
    question: "Quel est le rôle principal d'une stratégie de marketing d'influence ?",
    options: [
      "Créer des publicités payantes",
      "Collaborer avec des influenceurs pour promouvoir une marque",
      "Analyser le trafic web",
      "Automatiser les campagnes marketing"
    ],
    correctAnswer: "Collaborer avec des influenceurs pour promouvoir une marque"
  },
  {
    question: "Qu'est-ce que le taux de rebond (bounce rate) ?",
    options: [
      "Le pourcentage de visiteurs qui quittent le site après avoir vu une seule page",
      "Le pourcentage de conversions sur un site",
      "Le nombre total de visiteurs uniques",
      "Le temps moyen passé sur le site"
    ],
    correctAnswer: "Le pourcentage de visiteurs qui quittent le site après avoir vu une seule page"
  },
  {
    question: "Dans quel contexte utiliser un persona utilisateur ?",
    options: [
      "Pour optimiser les campagnes publicitaires",
      "Pour créer une base de données de clients",
      "Pour mieux comprendre les besoins et comportements des utilisateurs",
      "Pour concevoir des newsletters"
    ],
    correctAnswer: "Pour mieux comprendre les besoins et comportements des utilisateurs"
  },
  {
    question: "Quel outil est le plus couramment utilisé pour la création de rapports analytiques sur le trafic web ?",
    options: [
      "Adobe Photoshop",
      "Google Analytics",
      "Canva",
      "Slack"
    ],
    correctAnswer: "Google Analytics"
  },
  {
    question: "Quelle est la principale différence entre le marketing de contenu et le marketing d'influence ?",
    options: [
      "Le marketing de contenu est payant, le marketing d'influence est gratuit",
      "Le marketing d'influence implique des collaborations avec des personnes influentes, le marketing de contenu se concentre sur la création de contenu utile",
      "Le marketing de contenu utilise les médias traditionnels, le marketing d'influence est uniquement digital",
      "Le marketing d'influence est destiné aux grandes entreprises"
    ],
    correctAnswer: "Le marketing d'influence implique des collaborations avec des personnes influentes, le marketing de contenu se concentre sur la création de contenu utile"
  },
  {
    question: "Qu'est-ce que le taux de conversion dans le marketing digital ?",
    options: [
      "Le pourcentage de visiteurs qui achètent un produit ou complètent une action souhaitée",
      "Le nombre total de visiteurs d'un site",
      "Le taux de clics sur une annonce",
      "Le pourcentage de pages visitées"
    ],
    correctAnswer: "Le pourcentage de visiteurs qui achètent un produit ou complètent une action souhaitée"
  },
  {
    question: "Quelle est la meilleure pratique pour améliorer l'expérience utilisateur (UX) sur un site web ?",
    options: [
      "Ajouter plus de publicités",
      "Réduire le temps de chargement des pages",
      "Utiliser des pop-ups fréquents",
      "Augmenter la complexité des formulaires"
    ],
    correctAnswer: "Réduire le temps de chargement des pages"
  },
  {
    question: "Qu'est-ce qu'un CMS (Content Management System) ?",
    options: [
      "Un système de gestion de la relation client",
      "Un logiciel permettant de créer et gérer du contenu digital",
      "Un outil d'automatisation marketing",
      "Un réseau social professionnel"
    ],
    correctAnswer: "Un logiciel permettant de créer et gérer du contenu digital"
  },
  {
    question: "Quel est l'objectif principal d'un audit SEO ?",
    options: [
      "Augmenter le budget marketing",
      "Identifier les erreurs techniques et opportunités d'optimisation pour améliorer le classement dans les moteurs de recherche",
      "Créer des publicités payantes",
      "Analyser les campagnes d'influence"
    ],
    correctAnswer: "Identifier les erreurs techniques et opportunités d'optimisation pour améliorer le classement dans les moteurs de recherche"
  },
  {
    question: "Que signifie ROI dans le marketing digital ?",
    options: [
      "Return On Investment",
      "Rate Of Interaction",
      "Reach Of Influence",
      "Retention Of Information"
    ],
    correctAnswer: "Return On Investment"
  },
  {
    question: "Quelle est l'une des principales tendances du marketing digital en 2025 ?",
    options: [
      "Le retour des magazines papier",
      "L'utilisation de l'IA pour personnaliser les expériences utilisateur",
      "La suppression de toutes les publicités digitales",
      "L'abandon des réseaux sociaux"
    ],
    correctAnswer: "L'utilisation de l'IA pour personnaliser les expériences utilisateur"
  }
]

export default function AptitudeTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(''))
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
    if (currentQuestion < questions.length - 1) {
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
      return answer === questions[index].correctAnswer ? acc + 1 : acc
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
          totalQuestions: questions.length,
          answers
        }),
      })
    } catch (error) {
      console.error('Error saving results:', error)
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (showResults) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Test terminé !</h2>
        <p className="mb-4">Merci d'avoir complété le test, {studentName}.</p>
        <p className="mb-4">Votre score : {score} / {questions.length}</p>
        <p className="mb-4">Pourcentage : {((score / questions.length) * 100).toFixed(2)}%</p>
        <Button onClick={() => router.push('/')} className="mt-4">
          Retour à l'accueil
        </Button>
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

