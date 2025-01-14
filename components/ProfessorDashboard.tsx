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
  studentName: string
  score: number
  totalQuestions: number
  answers: string[]
}

export default function ProfessorDashboard() {
  const [results, setResults] = useState<TestResult[]>([])

  useEffect(() => {
    const storedResults = localStorage.getItem('testResults')
    if (storedResults) {
      setResults(JSON.parse(storedResults))
    }
  }, [])

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
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result, index) => (
            <TableRow key={index}>
              <TableCell>{result.studentName}</TableCell>
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

