'use client'

import { ArrowLeft, ChevronUp, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

export default function RoadmapBoard() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 overflow-hidden rounded-xl bg-[#1e2b58] p-4 shadow-md">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 text-white">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-blue-800"
                //TODO: Implement navigation to productName
                onClick={() => router.push('/test')}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-xl font-bold">Roadmap</h1>
            </div>
            <Button className="bg-purple-500 hover:bg-purple-600">
              <Plus className="mr-1 h-4 w-4" /> Add Feedback
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <KanbanColumn
            title="Planned"
            count={2}
            description="Ideas prioritized for research"
            color="bg-orange-300"
            items={plannedItems}
          />

          <KanbanColumn
            title="In-Progress"
            count={3}
            description="Currently being developed"
            color="bg-purple-500"
            items={inProgressItems}
          />

          <KanbanColumn
            title="Live"
            count={1}
            description="Released features"
            color="bg-blue-400"
            items={liveItems}
          />
        </div>
      </div>
    </div>
  )
}

interface KanbanColumnProps {
  title: string
  count: number
  description: string
  color: string
  items: KanbanItem[]
}

function KanbanColumn({
  title,
  count,
  description,
  color,
  items,
}: KanbanColumnProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-slate-800">
            {title} ({count})
          </h2>
        </div>
        <p className="text-sm text-slate-500">{description}</p>
        <div className={`mt-1 h-1 w-full rounded-full ${color}`}></div>
      </div>

      <div className="flex flex-col gap-4">
        {items.map((item, index) => (
          <KanbanCard key={index} item={item} columnType={title} />
        ))}
      </div>
    </div>
  )
}

interface KanbanItem {
  title: string
  description: string
  type: 'Feature' | 'Enhancement' | 'Bug'
  upvotes: number
  comments: number
}

function KanbanCard({
  item,
  columnType,
}: {
  item: KanbanItem
  columnType: string
}) {
  const [upvotes, setUpvotes] = useState(item.upvotes)

  const getStatusColor = () => {
    switch (columnType) {
      case 'Planned':
        return 'text-orange-500'
      case 'In-Progress':
        return 'text-purple-500'
      case 'Live':
        return 'text-blue-500'
      default:
        return 'text-gray-500'
    }
  }

  // const getStatusBg = () => {
  //   switch (columnType) {
  //     case 'Planned':
  //       return 'bg-orange-100'
  //     case 'In-Progress':
  //       return 'bg-purple-100'
  //     case 'Live':
  //       return 'bg-blue-100'
  //     default:
  //       return 'bg-gray-100'
  //   }
  // }

  const getTypeBg = () => {
    switch (item.type) {
      case 'Feature':
        return 'bg-blue-100 text-blue-700'
      case 'Enhancement':
        return 'bg-purple-100 text-purple-700'
      case 'Bug':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <Card className="overflow-hidden shadow-sm transition-all hover:shadow-md">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${getStatusColor()}`}></div>
          <span className={`text-sm font-medium ${getStatusColor()}`}>
            {columnType}
          </span>
        </div>
        <h3 className="mt-2 text-base font-bold text-slate-800">
          {item.title}
        </h3>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-slate-600">{item.description}</p>
        <div className="mt-2">
          <Badge
            variant="outline"
            className={`${getTypeBg()} border-0 text-xs font-normal`}
          >
            {item.type}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-3">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-full"
            onClick={() => setUpvotes((prev) => prev + 1)}
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          <span className="text-sm text-slate-600">{upvotes}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-slate-300"></div>
          <span className="text-sm text-slate-600">{item.comments}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

// Sample data
const plannedItems: KanbanItem[] = [
  {
    title: 'More comprehensive reports',
    description:
      'It would be great to see a more detailed breakdown of solutions.',
    type: 'Feature',
    upvotes: 123,
    comments: 2,
  },
  {
    title: 'Learning paths',
    description:
      'Sequenced projects for different goals to help people improve.',
    type: 'Feature',
    upvotes: 28,
    comments: 1,
  },
]

const inProgressItems: KanbanItem[] = [
  {
    title: 'One-click portfolio generation',
    description:
      'Add ability to create professional looking portfolio from profile.',
    type: 'Feature',
    upvotes: 62,
    comments: 1,
  },
  {
    title: 'Bookmark challenges',
    description: 'Be able to bookmark challenges to take later on.',
    type: 'Feature',
    upvotes: 31,
    comments: 1,
  },
  {
    title: 'Animated solution screenshots',
    description:
      "Screenshots of solutions with animations don't display correctly.",
    type: 'Bug',
    upvotes: 9,
    comments: 0,
  },
]

const liveItems: KanbanItem[] = [
  {
    title: 'Add micro-interactions',
    description: 'Small animations at specific points can add delight.',
    type: 'Enhancement',
    upvotes: 71,
    comments: 2,
  },
]
