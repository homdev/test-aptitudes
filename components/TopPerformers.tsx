import { Crown, Medal } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TopPerformer {
  id: string
  score: number
  totalQuestions: number
  student: {
    firstName: string
    lastName: string
  }
}

interface TopPerformersProps {
  performers: TopPerformer[]
}

export default function TopPerformers({ performers }: TopPerformersProps) {
  const getBadge = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="w-8 h-8 text-yellow-500" />
      case 1:
        return <Medal className="w-8 h-8 text-gray-400" />
      case 2:
        return <Medal className="w-8 h-8 text-amber-600" />
      default:
        return null
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {performers.map((performer, index) => (
        <Card key={index} className={`${index === 0 ? 'bg-yellow-50' : index === 1 ? 'bg-gray-50' : index === 2 ? 'bg-amber-50' : ''}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {index === 0 ? '1er' : index === 1 ? '2ème' : '3ème'} Place
            </CardTitle>
            {getBadge(index)}
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${performer.student.firstName} ${performer.student.lastName}`} />
                <AvatarFallback>{`${performer.student.firstName[0]}${performer.student.lastName[0]}`}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-semibold">{`${performer.student.firstName} ${performer.student.lastName}`}</p>
                <p className="text-sm text-muted-foreground">
                  Score: {performer.score} / {performer.totalQuestions} ({((performer.score / performer.totalQuestions) * 100).toFixed(2)}%)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

