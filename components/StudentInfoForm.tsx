/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

export default function StudentInfoForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName }),
      })
      
      const data = await response.json()

      if (!response.ok) {
        if (response.status === 403) {
          setError('Vous avez déjà passé le test. Vous ne pouvez pas le repasser.')
          return
        }
        throw new Error('Erreur lors de la gestion de l\'étudiant')
      }

      // Stocker les informations de session
      const sessionData = { 
        id: data.id,
        firstName: data.firstName, 
        lastName: data.lastName,
        sessionStarted: new Date().toISOString()
      }

      localStorage.setItem('studentInfo', JSON.stringify(sessionData))
      document.cookie = `session=${data.id}; path=/`
      router.push('/test')

    } catch (error) {
      console.error('Error managing student:', error)
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Informations de l'Élève
          </CardTitle>
          <CardDescription className="text-center">
            Veuillez saisir vos informations avant de commencer le test
          </CardDescription>
          {error && (
            <div className="text-red-500 text-center mt-2">
              {error}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <form id="studentForm" onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input
                id="firstName"
                placeholder="Entrez votre prénom"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input
                id="lastName"
                placeholder="Entrez votre nom"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            form="studentForm"
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            disabled={!firstName || !lastName || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Chargement...
              </>
            ) : (
              'Commencer le Test'
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

