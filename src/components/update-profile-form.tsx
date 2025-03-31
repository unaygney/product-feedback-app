'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const profileSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(100),
  image: z
    .string()
    .url({ message: 'Please enter a valid URL' })
    .optional()
    .or(z.literal('')),
})

type ProfileFormValues = z.infer<typeof profileSchema>

interface UpdateProfileFormProps {
  user?: {
    id: string
    name: string
    email: string
    image?: string | null
  }
  onClose?: () => void
}

export default function UpdateProfileForm({
  user,
  onClose,
}: UpdateProfileFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      image: user?.image || '',
    },
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = form

  const imageUrl = watch('image')

  async function onSubmit(data: ProfileFormValues) {
    setIsSubmitting(true)

    try {
      // Here you would typically make an API call to update the user profile
      // For example:
      // await fetch('/api/user/profile', {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // })

      console.log('Profile updated:', data)

      // Close the modal after successful update
      if (onClose) {
        onClose()
      }
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Update Profile</h2>
        <p className="text-muted-foreground text-sm">
          Update your profile information
        </p>
      </div>

      <div className="mb-6 flex justify-center">
        <Avatar className="h-24 w-24">
          <AvatarImage
            src={imageUrl || user?.image || ''}
            alt={user?.name || 'User'}
          />
          <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
        </Avatar>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">
            Name <span className="text-red-500">*</span>
          </Label>
          <Input id="name" placeholder="Your name" {...register('name')} />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Profile Image URL</Label>
          <Input
            id="image"
            placeholder="https://example.com/avatar.png"
            {...register('image')}
          />
          {errors.image && (
            <p className="text-sm text-red-500">{errors.image.message}</p>
          )}
          <p className="text-muted-foreground text-xs">
            Enter a URL for your profile image
          </p>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating...' : 'Update Profile'}
          </Button>
        </div>
      </form>
    </div>
  )
}
