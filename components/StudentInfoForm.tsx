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
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName }),
      })
      
      const data = await response.json()
      localStorage.setItem('studentInfo', JSON.stringify({ 
        id: data.id,
        firstName, 
        lastName 
      }))
      router.push('/test')
    } catch (error) {
      console.error('Error saving student:', error)
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
          <CardTitle className="text-2xl font-bold text-center">Informations de l'Élève</CardTitle>
          <CardDescription className="text-center">
            Veuillez saisir vos informations avant de commencer le test
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            onClick={handleSubmit}
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

