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
import Link from 'next/link'

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

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-700">Tableau de Bord</h1>
        <Link href="/">
          <Button variant="outline">Retour à l'accueil</Button>
        </Link>
      </div>

      <Table>
        <TableCaption>Résultats des tests d'aptitude des étudiants</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nom de l'étudiant</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Pourcentage</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result) => (
            <TableRow key={result.id}>
              <TableCell>{`${result.student.firstName} ${result.student.lastName}`}</TableCell>
              <TableCell>{result.score} / {result.totalQuestions}</TableCell>
              <TableCell>{((result.score / result.totalQuestions) * 100).toFixed(2)}%</TableCell>
              <TableCell>{new Date(result.createdAt).toLocaleDateString()}</TableCell>
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

