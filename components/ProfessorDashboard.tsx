/* eslint-disable react/no-unescaped-entities */

'use client'

import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import TopPerformers from '@/components/TopPerformers'
import Link from 'next/link'
import { Crown, Medal } from 'lucide-react'

interface TestResult {
  id: string
  score: number
  totalQuestions: number
  student: {
    firstName: string
    lastName: string
  }
  createdAt: string
}

export default function ProfessorDashboard() {
  const [results, setResults] = useState<TestResult[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch('/api/results')
        const data = await response.json()
        setResults(data)
      } catch (error) {
        console.error('Error fetching results:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [])

  if (isLoading) {
    return <div className="p-8 text-center">Chargement...</div>
  }

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="w-6 h-6 text-yellow-500" />
      case 1:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 2:
        return <Medal className="w-6 h-6 text-amber-600" />
      default:
        return null
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-700">Tableau de Bord</h1>
        <Link href="/">
          <Button variant="outline">Retour à l'accueil</Button>
        </Link>
      </div>

      {results.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-4">Top 3 Performers</h2>
          <TopPerformers performers={results.slice(0, 3)} />
        </>
      )}

<Table>
        <TableCaption>Classement complet des étudiants</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Rang</TableHead>
            <TableHead>Nom de l'étudiant</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Pourcentage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result, index) => (
            <TableRow key={index} className={index < 3 ? 'font-semibold' : ''}>
              <TableCell className="flex items-center space-x-2">
                <span>{index + 1}</span>
                {getRankBadge(index)}
              </TableCell>
              <TableCell>{`${result.student.firstName} ${result.student.lastName}`}</TableCell>
              <TableCell>{result.score} / {result.totalQuestions}</TableCell>
              <TableCell>{((result.score / result.totalQuestions) * 100).toFixed(2)}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {results.length === 0 && (
        <p className="text-center mt-4 text-gray-500">Aucun résultat de test disponible pour le moment.</p>
      )}
    </div>
  )
}

