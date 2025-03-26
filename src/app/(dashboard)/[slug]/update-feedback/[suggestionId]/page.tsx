'use client'

import { ChevronLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import React, { use, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import { useSuggestion, useUpdateSuggestion } from '@/hooks'

type UpdateSuggestionInput = {
  title: string
  category: string
  description: string
}

export default function UpdateFeedbackPage({
  params,
}: {
  params: Promise<{ suggestionId: string; slug: string }>
}) {
  const { suggestionId, slug } = use(params)
  const {
    suggestion,
    isLoading: isSuggestionLoading,
    isError,
  } = useSuggestion(suggestionId)
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateSuggestionInput>({
    defaultValues: {
      title: '',
      category: '',
      description: '',
    },
  })

  const { mutateAsync } = useUpdateSuggestion()

  useEffect(() => {
    if (suggestion) {
      reset({
        title: suggestion.title,
        category: suggestion.category,
        description: suggestion.description,
      })
    }
  }, [suggestion, reset])

  const onSubmit = async (data: UpdateSuggestionInput) => {
    if (!suggestion || !suggestion.id) {
      throw new Error('Suggestion is not available')
    }

    await mutateAsync({
      suggestionId: suggestion?.id,
      content: {
        title: data.title,
        category: data.category,
        description: data.description,
      },
    })
  }

  if (isSuggestionLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 text-purple-500" />
      </div>
    )
  }

  if (isError) {
    throw Error('Suggestion not found in UpdateFeedbackPage')
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-2xl">
        <Link
          href={`/${slug}`}
          className="mb-8 inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Go Back
        </Link>

        <div className="relative">
          <div className="absolute -top-5 left-6">
            <div className="rounded-full bg-purple-500 p-2 text-white">
              <ChevronLeft className="h-6 w-6" />
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 pt-10 shadow-sm">
            <h1 className="mb-6 text-2xl font-bold text-slate-900">
              Update Feedback
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">
                  Feedback Title
                </label>
                <p className="text-sm text-slate-500">
                  Add a short, descriptive headline
                </p>
                <Input
                  disabled={isSuggestionLoading || isSubmitting}
                  {...register('title', { required: true })}
                  className="w-full"
                />
                {errors.title && (
                  <p className="text-sm text-red-500">Title is required</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">
                  Category
                </label>
                <p className="text-sm text-slate-500">
                  Choose a category for your feedback
                </p>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      key={field.value}
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isSuggestionLoading || isSubmitting}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="feature">Feature</SelectItem>
                        <SelectItem value="bug">Bug</SelectItem>
                        <SelectItem value="enhancement">Enhancement</SelectItem>
                        <SelectItem value="ux">UX</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category && (
                  <p className="text-sm text-red-500">Category is required</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">
                  Feedback Detail
                </label>
                <p className="text-sm text-slate-500">
                  Include any specific comments on what should be improved,
                  added, etc.
                </p>
                <Textarea
                  disabled={isSuggestionLoading || isSubmitting}
                  {...register('description', { required: true })}
                  className="min-h-[120px]"
                />
                {errors.description && (
                  <p className="text-sm text-red-500">Detail is required</p>
                )}
              </div>

              <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  isLoading={isSubmitting}
                  className="w-full bg-purple-500 hover:bg-purple-600 sm:w-auto"
                >
                  {isSubmitting ? 'Updating...' : 'Update Feedback'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
