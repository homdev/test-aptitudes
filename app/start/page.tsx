import StudentInfoForm from '../../components/StudentInfoForm'

export default function StartPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-md">
        <StudentInfoForm />
      </div>
    </main>
  )
}

