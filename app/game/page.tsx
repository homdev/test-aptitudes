import InteractiveGame from '@/components/InteractiveGame'

export default function GamePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <h1 className="text-3xl font-bold text-center text-purple-700 p-6">Jeu de Scénarios Interactifs</h1>
        <InteractiveGame />
      </div>
    </main>
  )
}

