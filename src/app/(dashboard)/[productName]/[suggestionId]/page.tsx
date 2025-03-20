'use client'

import { ArrowLeft, ChevronUp } from 'lucide-react'
import { use, useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

//TODO: Implement SuggestionDetailPage

export default function SuggestionDetailPage({
  params,
}: {
  params: Promise<{ productName: string; suggestionId: string }>
}) {
  const [commentText, setCommentText] = useState('')
  const maxCharacters = 250

  const { productName, suggestionId } = use(params)
  console.log(productName, suggestionId)

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 text-blue-600"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Go Back</span>
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700">Edit Feedback</Button>
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
              <span className="font-bold text-gray-800">99</span>
            </Button>
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Add a dark theme option
                </h2>
                <p className="mt-1 text-gray-600">
                  It would help people with light sensitivities and who prefer
                  dark mode.
                </p>
                <Badge
                  variant="outline"
                  className="mt-3 bg-blue-50 text-blue-700 hover:bg-blue-100"
                >
                  Feature
                </Badge>
              </div>
              <div className="ml-4 flex items-center gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <span>4</span>
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
        <h3 className="mb-6 text-lg font-semibold text-gray-800">4 Comments</h3>

        <div className="space-y-6">
          {/* Comment 1 */}
          <div className="border-b pb-6">
            <div className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt="Elijah Moss"
                />
                <AvatarFallback>EM</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-800">Elijah Moss</h4>
                    <p className="text-sm text-gray-500">@hexagon.bestagon</p>
                  </div>
                  <Button variant="link" className="h-auto p-0 text-blue-600">
                    Reply
                  </Button>
                </div>
                <p className="mt-2 text-gray-700">
                  Also, please allow styles to be applied based on system
                  preferences. I would love to be able to browse Frontend Mentor
                  in the evening after my devices dark mode turns on without the
                  bright background it currently has.
                </p>
              </div>
            </div>
          </div>

          {/* Comment 2 */}
          <div className="border-b pb-6">
            <div className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt="James Skinner"
                />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      James Skinner
                    </h4>
                    <p className="text-sm text-gray-500">@hummingbird1</p>
                  </div>
                  <Button variant="link" className="h-auto p-0 text-blue-600">
                    Reply
                  </Button>
                </div>
                <p className="mt-2 text-gray-700">
                  Second this! I do a lot of late night coding and reading.
                  Adding a dark theme can be great for preventing eye strain and
                  the headaches that result. Its also quite a trend with modern
                  apps and apparently saves battery life.
                </p>
              </div>
            </div>
          </div>

          {/* Comment 3 - Reply to Comment 2 */}
          <div className="border-b pb-6">
            <div className="flex gap-4">
              <div className="hidden w-10 sm:block"></div>
              <div className="flex-1 border-l-2 border-gray-200 pl-4 sm:pl-6">
                <div className="flex gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="Anne Valentine"
                    />
                    <AvatarFallback>AV</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          Anne Valentine
                        </h4>
                        <p className="text-sm text-gray-500">@annev1990</p>
                      </div>
                      <Button
                        variant="link"
                        className="h-auto p-0 text-blue-600"
                      >
                        Reply
                      </Button>
                    </div>
                    <p className="mt-2 text-gray-700">
                      <span className="font-medium text-purple-600">
                        @hummingbird1
                      </span>{' '}
                      While waiting for dark mode, there are browser extensions
                      that will also do the job. Search for dark theme followed
                      by your browser. There might be a need to turn off the
                      extension for sites with naturally black backgrounds
                      though.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comment 4 - Reply to Comment 3 */}
          <div>
            <div className="flex gap-4">
              <div className="hidden w-10 sm:block"></div>
              <div className="flex-1 border-l-2 border-gray-200 pl-4 sm:pl-6">
                <div className="flex gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="Ryan Welles"
                    />
                    <AvatarFallback>RW</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          Ryan Welles
                        </h4>
                        <p className="text-sm text-gray-500">@voyager.344</p>
                      </div>
                      <Button
                        variant="link"
                        className="h-auto p-0 text-blue-600"
                      >
                        Reply
                      </Button>
                    </div>
                    <p className="mt-2 text-gray-700">
                      <span className="font-medium text-purple-600">
                        @annev1990
                      </span>{' '}
                      Good point! Using any kind of style extension is great and
                      can be highly customizable, like the ability to change
                      contrast and brightness. Id prefer not to use one of such
                      extensions, however, for security and privacy reasons.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Comment Section */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h3 className="mb-6 text-lg font-semibold text-gray-800">
          Add Comment
        </h3>
        <Textarea
          placeholder="Type your comment here"
          className="mb-4 min-h-24"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          maxLength={maxCharacters}
        />
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {maxCharacters - commentText.length} Characters left
          </span>
          <Button className="bg-purple-600 hover:bg-purple-700">
            Post Comment
          </Button>
        </div>
      </div>
    </div>
  )
}
