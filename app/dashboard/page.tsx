import ProfessorDashboard from '../../components/ProfessorDashboard'

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <ProfessorDashboard />
      </div>
    </main>
  )
}

