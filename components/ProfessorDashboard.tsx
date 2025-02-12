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
import { Brain, Target, FileSpreadsheet, FileDown } from 'lucide-react'
import * as XLSX from 'xlsx'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface TestResult {
  id: string
  score: number
  totalQuestions?: number
  totalScenarios?: number
  student: {
    firstName: string
    lastName: string
    class: string
  }
  createdAt: string
}

// Ajoutez ces interfaces pour TypeScript
interface AutoTableOptions {
  head: string[][];
  body: (string | number)[][];
  startY: number;
  theme: 'grid' | 'striped' | 'plain';
  styles: {
    fontSize: number;
    cellPadding: number;
  };
}

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: AutoTableOptions) => jsPDF;
  }
}

export default function ProfessorDashboard() {
  const [aptitudeResults, setAptitudeResults] = useState<TestResult[]>([])
  const [scenarioResults, setScenarioResults] = useState<TestResult[]>([])
  const [selectedClass, setSelectedClass] = useState<string>('all')
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

  const exportToExcel = (data: TestResult[], testType: string) => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((result, index) => ({
        Rang: index + 1,
        Nom: `${result.student.firstName} ${result.student.lastName}`,
        Score: result.score,
        Total: testType === 'aptitude' ? result.totalQuestions : result.totalScenarios,
        Pourcentage: `${((result.score / (testType === 'aptitude' ? result.totalQuestions! : result.totalScenarios!)) * 100).toFixed(2)}%`,
        Date: new Date(result.createdAt).toLocaleDateString()
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `Résultats ${testType}`);
    XLSX.writeFile(workbook, `classement_${testType}_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const exportToPDF = (data: TestResult[], testType: string) => {
    const doc = new jsPDF();
    
    const tableColumn = ["Rang", "Nom", "Score", "Pourcentage", "Date"];
    const tableRows = data.map((result, index) => [
      index + 1,
      `${result.student.firstName} ${result.student.lastName}`,
      `${result.score}/${testType === 'aptitude' ? result.totalQuestions : result.totalScenarios}`,
      `${((result.score / (testType === 'aptitude' ? result.totalQuestions! : result.totalScenarios!)) * 100).toFixed(2)}%`,
      new Date(result.createdAt).toLocaleDateString()
    ]);

    doc.text(`Classement - ${testType === 'aptitude' ? "Test d'Aptitude" : "Scénarios Interactifs"}`, 14, 15);
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 1 }
    });

    doc.save(`classement_${testType}_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const filterResultsByClass = (results: TestResult[]) => {
    if (selectedClass === 'all') return results
    return results.filter(result => result.student.class === selectedClass)
  }

  if (isLoading) {
    return <div className="p-8 text-center">Chargement...</div>
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-700">Tableau de Bord</h1>
        <div className="flex items-center gap-4">
          <div className="w-[200px]">
            <Select
              value={selectedClass}
              onValueChange={setSelectedClass}
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Filtrer par classe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les classes</SelectItem>
                <SelectItem value="bachelor3">Bachelor 3</SelectItem>
                <SelectItem value="master1">Master 1</SelectItem>
                <SelectItem value="master2">Master 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Link href="/">
            <Button variant="outline">Retour à l'accueil</Button>
          </Link>
        </div>
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
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">
                  Top 3 - Test d'Aptitude
                  {selectedClass !== 'all' && ` - ${selectedClass.charAt(0).toUpperCase() + selectedClass.slice(1)}`}
                </h2>
                <div className="flex gap-3">
                  <Button
                    onClick={() => exportToExcel(filterResultsByClass(aptitudeResults), 'aptitude')}
                    variant="outline"
                    className="flex items-center gap-2 hover:bg-green-50"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-green-600" />
                    <span className="hidden sm:inline">Exporter Excel</span>
                  </Button>
                  <Button
                    onClick={() => exportToPDF(filterResultsByClass(aptitudeResults), 'aptitude')}
                    variant="outline"
                    className="flex items-center gap-2 hover:bg-red-50"
                  >
                    <FileDown className="w-4 h-4 text-red-600" />
                    <span className="hidden sm:inline">Exporter PDF</span>
                  </Button>
                </div>
              </div>
              <TopPerformers performers={filterResultsByClass(aptitudeResults).slice(0, 3)} testType="aptitude" />
              <ResultsTable results={filterResultsByClass(aptitudeResults)} testType="aptitude" />
            </>
          )}
        </TabsContent>

        <TabsContent value="scenario">
          {scenarioResults.length > 0 && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">
                  Top 3 - Scénarios Interactifs
                  {selectedClass !== 'all' && ` - ${selectedClass.charAt(0).toUpperCase() + selectedClass.slice(1)}`}
                </h2>
                <div className="flex gap-3">
                  <Button
                    onClick={() => exportToExcel(filterResultsByClass(scenarioResults), 'scenario')}
                    variant="outline"
                    className="flex items-center gap-2 hover:bg-green-50"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-green-600" />
                    <span className="hidden sm:inline">Exporter Excel</span>
                  </Button>
                  <Button
                    onClick={() => exportToPDF(filterResultsByClass(scenarioResults), 'scenario')}
                    variant="outline"
                    className="flex items-center gap-2 hover:bg-red-50"
                  >
                    <FileDown className="w-4 h-4 text-red-600" />
                    <span className="hidden sm:inline">Exporter PDF</span>
                  </Button>
                </div>
              </div>
              <TopPerformers performers={filterResultsByClass(scenarioResults).slice(0, 3)} testType="scenario" />
              <ResultsTable results={filterResultsByClass(scenarioResults)} testType="scenario" />
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
          <TableHead>Classe</TableHead>
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
            <TableCell className="capitalize">{result.student.class}</TableCell>
            <TableCell>{result.score} / {getTotal(result)}</TableCell>
            <TableCell>{((result.score / getTotal(result)) * 100).toFixed(2)}%</TableCell>
            <TableCell>{new Date(result.createdAt).toLocaleDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

