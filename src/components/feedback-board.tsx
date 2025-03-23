'use client'

import { ChevronUp, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { notFound, useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

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
  useDownvoteMutation,
  useProduct,
  useUpvoteMutation,
  useVoteStatus,
} from '@/hooks'
import { SelectComment, SelectSuggestion, SelectVote } from '@/server/db/db'

function SuggestionItem({
  suggestion,
  slug,
}: {
  suggestion: SelectSuggestion & {
    comments: SelectComment[]
    votes: SelectVote[]
  }
  slug: string
}) {
  const { data: isVoted } = useVoteStatus(suggestion.id)
  const { mutate: upvote } = useUpvoteMutation(suggestion.id)
  const { mutate: downvote } = useDownvoteMutation(suggestion.id)

  return (
    <Link prefetch={true} href={`/${slug}/${suggestion.id}`}>
      <Card className="flex flex-row gap-6 p-6">
        <Button
          variant="secondary"
          className={cn(
            'h-[53px] cursor-pointer flex-col gap-2 bg-gray-100 px-3 py-2 transition-colors hover:bg-gray-200',
            { 'bg-gray-300': isVoted }
          )}
          onClick={(e) => {
            e.preventDefault()
            if (isVoted) {
              downvote()
            } else {
              upvote()
            }
          }}
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

export default function FeedbackBoard({ slug }: { slug: string }) {
  const router = useRouter()
  const pathname = usePathname()

  const { product } = useProduct(slug)

  if (!product) return notFound()

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
                      router.push(`/${product.slug}?category=${c}`)
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
                  href={`/${product.slug}/roadmap`}
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
                    slug={product.slug}
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
