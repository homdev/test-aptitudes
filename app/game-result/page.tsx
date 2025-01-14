/* eslint-disable react/no-unescaped-entities */

'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function GameResultsPage() {
  const [choices, setChoices] = useState<string[]>([])

  useEffect(() => {
    // In a real application, you would fetch the choices from a database or state management solution
    // For this example, we'll use mock data
    setChoices(['A', 'B', 'C'])
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-purple-700">Résultats du Jeu</CardTitle>
            <CardDescription className="text-center">Voici un résumé de vos choix et leur impact</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {choices.map((choice, index) => (
                <li key={index} className="bg-purple-100 p-4 rounded-lg">
                  <p className="font-bold">Scénario {index + 1}: Option {choice}</p>
                  <p>Analyse de l'impact de votre choix...</p>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Retour à l'accueil
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}

