'use client'

import { ChevronUp, MessageSquare } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function FeedbackBoard() {
  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="mx-auto max-w-6xl">
        <div className="flex">
          {/* Sidebar - Fixed width */}
          <div className="mr-8 w-[300px]">
            {/* Header Card */}
            <div className="mb-6 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-purple-500 p-6 text-white">
              <h1 className="text-2xl font-bold">Frontend Mentor</h1>
              <p className="text-sm opacity-90">Feedback Board</p>
            </div>

            {/* Filter Card */}
            <Card className="mb-6 p-6">
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className="cursor-pointer bg-blue-50 text-blue-700 hover:bg-blue-50"
                >
                  All
                </Badge>
                <Badge variant="secondary" className="cursor-pointer">
                  UI
                </Badge>
                <Badge variant="secondary" className="cursor-pointer">
                  UX
                </Badge>
                <Badge variant="secondary" className="cursor-pointer">
                  Enhancement
                </Badge>
                <Badge variant="secondary" className="cursor-pointer">
                  Bug
                </Badge>
                <Badge variant="secondary" className="cursor-pointer">
                  Feature
                </Badge>
              </div>
            </Card>

            {/* Roadmap Card */}
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Roadmap</h2>
                <Button variant="link" className="p-0 text-sm text-blue-600">
                  View
                </Button>
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-orange-400" />
                    <span className="text-gray-600">Planned</span>
                  </div>
                  <span className="font-bold">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-purple-600" />
                    <span className="text-gray-600">In-Progress</span>
                  </div>
                  <span className="font-bold">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-cyan-400" />
                    <span className="text-gray-600">Live</span>
                  </div>
                  <span className="font-bold">1</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content - Flexible width */}
          <div className="flex-1" style={{ flex: '1' }}>
            {/* Header */}
            <div className="mb-6 flex items-center justify-between rounded-lg bg-gray-800 p-4 text-white">
              <div className="flex items-center gap-4">
                <div>
                  <span>6 Suggestions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-300">Sort by:</span>
                  <Select defaultValue="most">
                    <SelectTrigger className="w-[140px] border-0 bg-transparent p-0 text-white">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="most">Most Upvotes</SelectItem>
                      <SelectItem value="least">Least Upvotes</SelectItem>
                      <SelectItem value="comments">Most Comments</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700">
                + Add Feedback
              </Button>
            </div>

            {/* Feedback Items */}
            <div className="space-y-4">
              <Card className="flex flex-row gap-6 p-6">
                <Button
                  variant="secondary"
                  className="h-[53px] cursor-pointer flex-col gap-2 bg-gray-100 px-3 py-2"
                >
                  <ChevronUp className="h-4 w-4" />
                  <span className="font-bold">112</span>
                </Button>
                <div className="flex-1">
                  <h3 className="font-semibold">Add tags for solutions</h3>
                  <p className="mt-1 text-gray-600">
                    Easier to search for solutions based on a specific stack.
                  </p>
                  <Badge
                    variant="secondary"
                    className="mt-4 bg-blue-50 text-blue-700 hover:bg-blue-50"
                  >
                    Enhancement
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MessageSquare className="h-4 w-4" />
                  <span>2</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
