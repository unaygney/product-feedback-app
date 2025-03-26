'use client'

import { ArrowLeft, ChevronUp, Loader2 } from 'lucide-react'
import nameInitials from 'name-initials'
import Link from 'next/link'
import { notFound, usePathname } from 'next/navigation'
import { use, useState } from 'react'

import { authClient } from '@/lib/auth-client'
import { cn } from '@/lib/utils'

import CommentForm from '@/components/add-comment-section'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'

import { useSuggestion } from '@/hooks/queries/use-suggestion'

export default function SuggestionDetailPage({
  params,
}: {
  params: Promise<{ slug: string; suggestionId: string }>
}) {
  const pathname = usePathname()
  const { suggestionId, slug } = use(params)
  const { suggestion, isLoading, isError } = useSuggestion(suggestionId)
  const { data: session } = authClient.useSession()

  const [activeReplyId, setActiveReplyId] = useState<string | null>(null)

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-6 md:py-8">
        <div className="flex h-32 items-center justify-center">
          <Loader2 className="animate-spin text-purple-500" />
        </div>
      </div>
    )
  }

  if (isError || !suggestion) {
    return notFound()
  }

  const handleReplyClick = (commentId: string) => {
    if (activeReplyId === commentId) {
      setActiveReplyId(null)
    } else {
      setActiveReplyId(commentId)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href={{ pathname: `/${pathname.split('/')[1]}` }}
          className={cn(
            buttonVariants({ variant: 'link' }),
            'flex items-center gap-1 text-blue-600'
          )}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Go Back</span>
        </Link>
        {session?.user?.id === suggestion.userId && (
          <Link
            href={`/${slug}/update-feedback/${suggestion.id}`}
            className={cn(
              buttonVariants({ variant: 'link' }),
              'bg-blue-600 text-white hover:bg-blue-700'
            )}
          >
            Edit Feedback
          </Link>
        )}
      </div>

      {/* Feature Card */}
      <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
        <div className="flex gap-4">
          <div className="hidden flex-col items-center sm:flex">
            <Button
              variant="ghost"
              size="sm"
              className="flex h-auto flex-col rounded-lg bg-gray-50 p-2 hover:bg-gray-100"
            >
              <ChevronUp className="h-4 w-4 text-blue-600" />
              <span className="font-bold text-gray-800">
                {suggestion?.votes.length}
              </span>
            </Button>
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {suggestion?.title}
                </h2>
                <p className="mt-1 text-gray-600">{suggestion?.description}</p>
                <Badge
                  variant="outline"
                  className="mt-3 bg-blue-50 text-blue-700 hover:bg-blue-100"
                >
                  {suggestion?.category}
                </Badge>
              </div>
              <div className="ml-4 flex items-center gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <span>{suggestion?.comments.length}</span>
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
        <h3 className="mb-6 text-lg font-semibold text-gray-800">
          {suggestion?.comments.length === 0
            ? 'No Comments Yet'
            : `${suggestion?.comments.length} Comments`}
        </h3>

        <div className="space-y-6">
          {suggestion?.comments.map((comment) =>
            comment.parentCommentId ? (
              <div key={comment.id} className="border-b pb-6">
                <div className="flex gap-4">
                  <div className="hidden w-10 sm:block"></div>
                  <div className="flex-1 border-l-2 border-gray-200 pl-4 sm:pl-6">
                    <div className="flex gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src="/placeholder.svg?height=40&width=40"
                          alt={comment.author.name}
                        />
                        <AvatarFallback>
                          {nameInitials(comment.author.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-800">
                              {comment.author.name}
                            </h4>
                          </div>
                          <Button
                            variant="link"
                            className="h-auto p-0 text-blue-600"
                            onClick={() => handleReplyClick(comment.id)}
                          >
                            Reply
                          </Button>
                        </div>
                        <p className="mt-2 text-gray-700">{comment.content}</p>
                        {activeReplyId === comment.id && (
                          <div className="mt-4">
                            <CommentForm
                              suggestionId={suggestionId}
                              parentCommentId={comment.id}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div key={comment.id} className="border-b pb-6">
                <div className="flex gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt={comment.author.name}
                    />
                    <AvatarFallback>
                      {nameInitials(comment.author.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {comment.author.name}
                        </h4>
                      </div>
                      <Button
                        variant="link"
                        className="h-auto p-0 text-blue-600"
                        onClick={() => handleReplyClick(comment.id)}
                      >
                        Reply
                      </Button>
                    </div>
                    <p className="mt-2 text-gray-700">{comment.content}</p>
                    {activeReplyId === comment.id && (
                      <div className="mt-4">
                        <CommentForm
                          suggestionId={suggestionId}
                          parentCommentId={comment.id}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <CommentForm suggestionId={suggestionId} />
    </div>
  )
}
