'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ChevronUp, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import toast from 'react-hot-toast'

import { client } from '@/lib/client'
import { cn } from '@/lib/utils'

import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import EmptyFeedback from './empty-suggestions'
import {
  SelectComment,
  SelectProduct,
  SelectSuggestion,
  SelectVote,
} from '@/server/db/db'

const useVoteStatus = (suggestionId: string) => {
  return useQuery({
    queryKey: ['isVoted', suggestionId],
    queryFn: async () => {
      const res = await client.upvote.check.$get({
        suggestionId: suggestionId,
      })
      const r = await res.json()
      return r.isVoted
    },
  })
}

const useUpvoteMutation = (suggestionId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      await client.upvote.upvote.$post({
        suggestionId: suggestionId,
      })
    },
    onSuccess: async () => {
      toast.success('Upvoted!')
      await queryClient.invalidateQueries({
        queryKey: ['isVoted', suggestionId],
      })
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })
}

const useDownvoteMutation = (suggestionId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      await client.upvote.downvote.$post({
        suggestionId: suggestionId,
      })
    },
    onSuccess: async () => {
      toast.success('Downvoted!')
      await queryClient.invalidateQueries({
        queryKey: ['isVoted', suggestionId],
      })
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })
}

function SuggestionItem({
  suggestion,
  productName,
}: {
  suggestion: SelectSuggestion & {
    comments: SelectComment[]
    votes: SelectVote[]
  }
  productName: string
}) {
  // Hooks are now at the top level of this component
  const { data: isVoted } = useVoteStatus(suggestion.id)
  const { mutate: upvote } = useUpvoteMutation(suggestion.id)
  const { mutate: downvote } = useDownvoteMutation(suggestion.id)

  const handleVoteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (isVoted) {
      downvote()
    } else {
      upvote()
    }
  }

  return (
    <Link prefetch={true} href={`/${productName}/${suggestion.id}`}>
      <Card className="flex flex-row gap-6 p-6">
        <Button
          variant="secondary"
          className={cn(
            'h-[53px] cursor-pointer flex-col gap-2 bg-gray-100 px-3 py-2 transition-colors hover:bg-gray-200',
            { 'bg-gray-300': isVoted }
          )}
          onClick={handleVoteClick}
        >
          <ChevronUp className="h-4 w-4" />
          <span className="font-bold">{suggestion?.votes.length || 0}</span>
        </Button>
        <div className="flex-1">
          <h3 className="font-semibold">{suggestion.title}</h3>
          <p className="mt-1 text-gray-600">{suggestion.description}</p>
          <Badge
            variant="secondary"
            className="mt-4 bg-blue-50 text-blue-700 capitalize hover:bg-blue-50"
          >
            {suggestion.category}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <MessageSquare className="h-4 w-4" />
          <span>{suggestion.comments.length}</span>
        </div>
      </Card>
    </Link>
  )
}

export default function FeedbackBoard({
  product,
}: {
  product: SelectProduct & {
    suggestions: (SelectSuggestion & {
      comments: SelectComment[]
      votes: SelectVote[]
    })[]
  }
}) {
  const router = useRouter()
  const pathname = usePathname()

  const suggestionCategory = new Set(
    product.suggestions.map((suggestion) => suggestion.category)
  )

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="mx-auto max-w-6xl">
        <div className="flex">
          {/* Sidebar - Fixed width */}
          <div className="mr-8 w-[300px]">
            {/* Header Card */}
            <div className="mb-6 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-purple-500 p-6 text-white">
              <h1 className="text-2xl font-bold">{product?.name}</h1>
              <p className="text-sm opacity-90">Feedback Board</p>
            </div>

            {/* Filter Card */}
            <Card className="mb-6 p-6">
              <div className="flex flex-wrap gap-2">
                {Array.from(suggestionCategory).map((c) => (
                  <Badge
                    key={c}
                    variant="secondary"
                    className="cursor-pointer bg-blue-50 text-blue-700 capitalize hover:bg-blue-50"
                    onClick={() =>
                      router.push(`/${product.name}?category=${c}`)
                    }
                  >
                    {c}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Roadmap Card */}
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Roadmap</h2>
                <Link
                  className={cn(
                    buttonVariants({
                      variant: 'link',
                      className: 'p-0 text-sm text-blue-600 no-underline',
                    })
                  )}
                  prefetch={true}
                  href={`/${product.name}/roadmap`}
                >
                  View
                </Link>
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-orange-400" />
                    <span className="text-gray-600">Planned</span>
                  </div>
                  <span className="font-bold">
                    {
                      product.suggestions.filter((s) => s.status === 'planned')
                        .length
                    }
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-purple-600" />
                    <span className="text-gray-600">In-Progress</span>
                  </div>
                  <span className="font-bold">
                    {
                      product.suggestions.filter(
                        (s) => s.status === 'in-progress'
                      ).length
                    }
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-cyan-400" />
                    <span className="text-gray-600">Live</span>
                  </div>
                  <span className="font-bold">
                    {
                      product.suggestions.filter((s) => s.status === 'live')
                        .length
                    }
                  </span>
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
                  {product.suggestions.length > 0 ? (
                    <span className="text-xl font-bold">
                      {product.suggestions.length} Suggestions
                    </span>
                  ) : (
                    <span className="text-xl font-bold">
                      No suggestions yet
                    </span>
                  )}
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
              <Link
                href={{ pathname: `${pathname}/create-feedback` }}
                className={cn(
                  buttonVariants({ variant: 'link' }),
                  'bg-purple-600 text-white hover:bg-purple-700'
                )}
              >
                + Add Feedback
              </Link>
            </div>

            {/* Feedback Items */}
            <div className="flex flex-col gap-4">
              {product.suggestions.length > 0 ? (
                product.suggestions.map((suggestion) => (
                  <SuggestionItem
                    key={suggestion.id}
                    suggestion={suggestion}
                    productName={product.name}
                  />
                ))
              ) : (
                <EmptyFeedback />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
