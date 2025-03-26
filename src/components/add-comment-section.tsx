'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import { useCreateComment } from '@/hooks'

interface CommentFormProps {
  suggestionId: string
  parentCommentId?: string | null
}

const commentSchema = z.object({
  comment: z
    .string()
    .min(1, 'Comment cannot be empty')
    .max(250, 'Comment cannot be longer than 250 characters'),
})

type CommentFormData = z.infer<typeof commentSchema>

export default function CommentForm({
  suggestionId,
  parentCommentId = null,
}: CommentFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  })

  const { mutateAsync: createComment } = useCreateComment()

  const onSubmit = async (data: CommentFormData) => {
    await createComment({
      content: data.comment,
      suggestionId,
      parentCommentId,
    })
    setTimeout(() => {
      reset({ comment: '' })
    }, 1000)
  }

  const commentValue = watch('comment') || ''

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg bg-white p-6 shadow-sm"
    >
      <h3 className="mb-6 text-lg font-semibold text-gray-800">Add Comment</h3>
      <Textarea
        placeholder="Type your comment here"
        className="mb-4 min-h-24"
        {...register('comment')}
      />
      {errors.comment && (
        <p className="mb-2 text-sm text-red-500">{errors.comment.message}</p>
      )}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {250 - commentValue.length} Characters left
        </span>
        <Button
          isLoading={isSubmitting}
          type="submit"
          className="bg-purple-600 hover:bg-purple-700"
        >
          Post Comment
        </Button>
      </div>
    </form>
  )
}
