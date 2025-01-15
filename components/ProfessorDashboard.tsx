/* eslint-disable react/no-unescaped-entities */

'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Crown, Medal, Brain, Target } from 'lucide-react'

interface TestResult {
  id: string
  score: number
  totalQuestions?: number
  totalScenarios?: number
  student: {
    firstName: string
    lastName: string
  }
  createdAt: string
}

export default function ProfessorDashboard() {
  const [aptitudeResults, setAptitudeResults] = useState<TestResult[]>([])
  const [scenarioResults, setScenarioResults] = useState<TestResult[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const [aptitudeResponse, scenarioResponse] = await Promise.all([
          fetch('/api/results/aptitude'),
          fetch('/api/results/scenario')
        ])
        
        const aptitudeData = await aptitudeResponse.json()
        const scenarioData = await scenarioResponse.json()
        
        console.log('Nombre de scénarios reçus:', scenarioData.length)
        
        setAptitudeResults(aptitudeData)
        setScenarioResults(scenarioData)
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

      <Tabs defaultValue="aptitude" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="aptitude" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Test d'Aptitude
          </TabsTrigger>
          <TabsTrigger value="scenario" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Scénarios Interactifs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="aptitude">
          {aptitudeResults.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Top 3 - Test d'Aptitude</h2>
              <TopPerformers performers={aptitudeResults.slice(0, 3)} testType="aptitude" />
              <ResultsTable results={aptitudeResults} testType="aptitude" />
            </>
          )}
        </TabsContent>

        <TabsContent value="scenario">
          {scenarioResults.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Top 3 - Scénarios Interactifs</h2>
              <TopPerformers performers={scenarioResults.slice(0, 3)} testType="scenario" />
              <ResultsTable results={scenarioResults} testType="scenario" />
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ResultsTable({ results, testType }: { results: TestResult[], testType: 'aptitude' | 'scenario' }) {
  const getTotal = (result: TestResult) => {
    return testType === 'aptitude' 
      ? result?.totalQuestions ?? 0 
      : result?.totalScenarios ?? 0
  }

  return (
    <Table>
      <TableCaption>
        Classement complet - {testType === 'aptitude' ? "Test d'Aptitude" : "Scénarios Interactifs"}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Rang</TableHead>
          <TableHead>Nom de l'étudiant</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Pourcentage</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results.map((result, index) => (
          <TableRow key={result.id}>
            <TableCell className="flex items-center space-x-2">
              <span>{index + 1}</span>
              {index < 3 && (
                <span>{index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}</span>
              )}
            </TableCell>
            <TableCell>{`${result.student.firstName} ${result.student.lastName}`}</TableCell>
            <TableCell>{result.score} / {getTotal(result)}</TableCell>
            <TableCell>{((result.score / getTotal(result)) * 100).toFixed(2)}%</TableCell>
            <TableCell>{new Date(result.createdAt).toLocaleDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

