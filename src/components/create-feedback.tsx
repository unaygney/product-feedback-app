'use client'

import { useMutation } from '@tanstack/react-query'
import { ChevronLeft, Plus } from 'lucide-react'
import Link from 'next/link'
import type React from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { client } from '@/lib/client'
import { CreateSuggestionInput } from '@/lib/form-schemas'

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

export default function CreateFeedback({ slug }: { slug: string }) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateSuggestionInput>()

  const { mutate: createPost, isPending } = useMutation({
    mutationFn: async (data: CreateSuggestionInput) => {
      const res = await client.suggestion.create.$post(data)
      return res
    },
    onSuccess: () => {
      toast.success('Feedback added successfully!')
      reset({ title: '', category: undefined, description: '' })
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('An unknown error occurred')
      }
    },
  })

  const onSubmit = (data: CreateSuggestionInput) => {
    createPost(data)
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-2xl">
        <Link
          href={{ pathname: `/${slug}` }}
          className="mb-8 inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Go Back
        </Link>

        <div className="relative">
          <div className="absolute -top-5 left-6">
            <div className="rounded-full bg-purple-500 p-2 text-white">
              <Plus className="h-6 w-6" />
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 pt-10 shadow-sm">
            <h1 className="mb-6 text-2xl font-bold text-slate-900">
              Create New Feedback
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
                  disabled={isPending}
                  isLoading={isPending}
                  className="w-full bg-purple-500 hover:bg-purple-600 sm:w-auto"
                >
                  {isPending ? 'Adding...' : 'Add Feedback'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
