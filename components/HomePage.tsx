/* eslint-disable react/no-unescaped-entities */
'use client'

import { motion } from 'framer-motion'
import { ArrowRightIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import RetroGrid from '@/components/ui/retro-grid'

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex flex-col justify-center items-center p-4 text-white overflow-hidden">
      {/* RetroGrid en arrière-plan */}
      <RetroGrid 
        className="z-0" 
        opacity={0.4}
        cellSize={40}
        angle={55}
        lightLineColor="rgba(255,255,255,0.3)"
        darkLineColor="rgba(255,255,255,0.3)"
      />

      {/* Contenu principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 uppercase">
          Test d'Aptitudes
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">
          Évaluez vos compétences en Communication Digitale <br /> & E-influence
        </p>
        <div className="space-x-4">
          <Link href="/start">
            <Button 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-purple-100 transition-colors duration-300"
            >
              Commencer le Test
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-16 text-sm text-purple-200 relative z-10"
      >
        Durée estimée : 30-45 minutes
      </motion.div>
    </div>
  )
}

