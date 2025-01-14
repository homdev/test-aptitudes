'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

interface Scenario {
  id: number
  question: string
  title: string
  options: {
    id: string
    text: string
    feedback: string
  }[]
}

const scenarios: Scenario[] = [
    {
      id: 1,
      title: "Lancer une Campagne Marketing pour un Nouveau Produit",
      question: "Quelle stratégie utilisez-vous pour promouvoir votre produit ?",
      options: [
        { id: "A", text: "Collaborer avec des influenceurs", feedback: "Bonne idée ! Les influenceurs peuvent générer des résultats rapides, mais attention au coût." },
        { id: "B", text: "Optimiser le SEO du site web", feedback: "Excellente stratégie sur le long terme, mais cela prendra du temps avant d'obtenir des résultats." },
        { id: "C", text: "Créer une campagne de contenu", feedback: "Très bien ! Le contenu engageant peut fidéliser votre audience, mais nécessite de la créativité et de la régularité." },
      ],
    },
    {
      id: 2,
      title: "Augmenter le Taux de Conversion sur le Site Web",
      question: "Quelle action prenez-vous pour améliorer le taux de conversion ?",
      options: [
        { id: "A", text: "Simplifier le parcours utilisateur", feedback: "Bonne idée ! Un parcours fluide réduit le taux d'abandon." },
        { id: "B", text: "Ajouter des pop-ups", feedback: "Attention ! Les pop-ups peuvent être intrusifs et faire fuir les utilisateurs." },
        { id: "C", text: "Offrir une réduction", feedback: "Offrir des promotions peut inciter les utilisateurs à finaliser leur achat." },
      ],
    },
    {
      id: 3,
      title: "Lancer un Blog pour l'Entreprise",
      question: "Quel sujet choisissez-vous pour votre premier article de blog ?",
      options: [
        { id: "A", text: "Les nouveautés de l'entreprise", feedback: "C'est bien, mais les utilisateurs préfèrent souvent des contenus utiles." },
        { id: "B", text: "Conseils pratiques liés à votre secteur", feedback: "Excellent choix ! Cela renforce votre crédibilité et attire du trafic." },
        { id: "C", text: "Présentation de l'équipe", feedback: "Cela humanise votre marque, mais n'attire pas forcément du trafic." },
      ],
    },
    {
      id: 4,
      title: "Faire Face à une Crise sur les Réseaux Sociaux",
      question: "Quel est votre premier réflexe ?",
      options: [
        { id: "A", text: "Ignorer les commentaires", feedback: "Mauvaise idée ! Il est essentiel de répondre aux préoccupations." },
        { id: "B", text: "Répondre de manière professionnelle et rapide", feedback: "Bonne réponse ! La transparence est la clé dans une crise." },
        { id: "C", text: "Supprimer les commentaires négatifs", feedback: "Cela pourrait empirer la situation." },
      ],
    },
    {
      id: 5,
      title: "Optimiser le Référencement Local",
      question: "Quelle action prioritaire prenez-vous ?",
      options: [
        { id: "A", text: "Créer une fiche Google My Business", feedback: "Bonne idée ! Cela améliore la visibilité locale." },
        { id: "B", text: "Augmenter le nombre de mots-clés sur le site", feedback: "Attention à ne pas surcharger le contenu." },
        { id: "C", text: "Créer une newsletter locale", feedback: "Utile, mais cela n'améliore pas directement le SEO local." },
      ],
    },
    {
      id: 6,
      title: "Améliorer la Fidélisation des Clients",
      question: "Quelle action mettez-vous en place ?",
      options: [
        { id: "A", text: "Proposer un programme de fidélité", feedback: "Très bien ! Cela incite les clients à revenir." },
        { id: "B", text: "Réduire les prix", feedback: "Attention ! Cela peut affecter la perception de la qualité." },
        { id: "C", text: "Envoyer des emails de remerciement", feedback: "Bonne idée ! Cela renforce la relation client." },
      ],
    },
    {
      id: 7,
      title: "Lancer une Publicité Payante sur les Réseaux Sociaux",
      question: "Quel est votre objectif principal ?",
      options: [
        { id: "A", text: "Augmenter le nombre de likes", feedback: "Cela peut aider, mais ce n'est pas directement lié aux ventes." },
        { id: "B", text: "Générer des leads qualifiés", feedback: "Très bien ! C'est un objectif concret et mesurable." },
        { id: "C", text: "Créer une vidéo virale", feedback: "Attention à ne pas sacrifier le message pour le buzz." },
      ],
    },
    {
      id: 8,
      title: "Augmenter l'Engagement sur Instagram",
      question: "Quelle stratégie utilisez-vous ?",
      options: [
        { id: "A", text: "Publier des stories interactives", feedback: "Excellent choix ! Les stories favorisent l'engagement." },
        { id: "B", text: "Augmenter la fréquence des publications", feedback: "Attention ! La qualité prime sur la quantité." },
        { id: "C", text: "Acheter des followers", feedback: "Mauvaise idée ! Cela nuit à votre crédibilité." },
      ],
    },
    {
      id: 9,
      title: "Analyser la Performance d'une Campagne Emailing",
      question: "Quel KPI surveillez-vous en priorité ?",
      options: [
        { id: "A", text: "Le taux d'ouverture", feedback: "Important, mais cela ne montre pas les conversions." },
        { id: "B", text: "Le taux de conversion", feedback: "Très bien ! Cela montre si la campagne atteint ses objectifs." },
        { id: "C", text: "Le nombre de clics", feedback: "Utile, mais pas suffisant seul." },
      ],
    },
    {
      id: 10,
      title: "Créer un Persona Utilisateur",
      question: "Quel élément est le plus important ?",
      options: [
        { id: "A", text: "Le nom du persona", feedback: "Ce n'est pas essentiel." },
        { id: "B", text: "Les besoins et motivations", feedback: "Très bien ! Cela aide à cibler les actions marketing." },
        { id: "C", text: "L'âge exact", feedback: "Utile, mais les besoins priment." },
      ],
    }
  ];
  

export default function InteractiveGame() {
  const [currentScenario, setCurrentScenario] = useState(0)
  const [choices, setChoices] = useState<string[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const router = useRouter()

  const handleChoice = (optionId: string) => {
    setChoices([...choices, optionId])
    setShowFeedback(true)
  }

  const handleNext = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1)
      setShowFeedback(false)
    } else {
      // Game over, redirect to results
      router.push('/game-results')
    }
  }

  const scenario = scenarios[currentScenario]
  const selectedOption = showFeedback ? scenario.options.find(option => option.id === choices[choices.length - 1]) : null

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
            <CardTitle className="text-2xl font-bold text-purple-700">Scénario {scenario.id}</CardTitle>
            <CardDescription className="text-lg">{scenario.question}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scenario.options.map((option) => (
                <Button
                  key={option.id}
                  onClick={() => handleChoice(option.id)}
                  className="w-full text-left justify-start h-auto py-4 px-6"
                  disabled={showFeedback}
                >
                  <span className="font-bold mr-2">{option.id}.</span> {option.text}
                </Button>
              ))}
            </div>
          </CardContent>
          {showFeedback && selectedOption && (
            <CardFooter>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-purple-100 p-4 rounded-lg mt-4"
              >
                <p className="font-bold mb-2">Feedback :</p>
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
          <Button onClick={handleNext} className="bg-purple-600 hover:bg-purple-700 text-white">
            {currentScenario < scenarios.length - 1 ? "Scénario Suivant" : "Voir les Résultats"}
          </Button>
        </motion.div>
      )}
    </div>
  )
}

