'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import slugify from 'slugify'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import { useAddProduct } from '@/hooks'

const slugOptions = {
  replacement: '-',
  remove: undefined,
  lower: false,
  strict: false,
  locale: 'vi',
  trim: true,
}

const productSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(100),
  description: z.string().max(500).optional().or(z.literal('')),
  logo: z
    .string()
    .url({ message: 'Please enter a valid URL' })
    .optional()
    .or(z.literal('')),
  websiteUrl: z
    .string()
    .url({ message: 'Please enter a valid URL' })
    .optional()
    .or(z.literal('')),
})

type ProductFormValues = z.infer<typeof productSchema>

interface AddProductFormProps {
  onClose?: () => void
  refetch?: () => void
}

export default function AddProductForm({ onClose }: AddProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      logo: '',
      websiteUrl: '',
    },
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = form

  const { mutateAsync } = useAddProduct()
  const logoUrl = watch('logo')

  const logo = `https://wsrv.nl/?url=${encodeURIComponent(logoUrl || '')}`

  async function onSubmit(data: ProductFormValues) {
    setIsSubmitting(true)

    try {
      await mutateAsync({
        name: data.name,
        slug: slugify(data.name, slugOptions),
        description: data.description || '',
        logo: data.logo || '',
        websiteUrl: data.websiteUrl || '',
      })

      if (onClose) {
        onClose()
      }
      form.reset({
        name: '',
        description: '',
        logo: '',
        websiteUrl: '',
      })
    } catch (error) {
      console.error('Error adding product:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Add New Product</h2>
        <p className="text-muted-foreground text-sm">
          Enter the details for your new product
        </p>
      </div>

      {logoUrl && (
        <div className="mb-6 flex justify-center">
          <div className="relative h-24 w-24 overflow-hidden rounded-md border">
            <Image
              src={logo || '/placeholder.svg'}
              alt="Product logo preview"
              className="h-full w-full object-cover"
              fill
            />
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">
            Name <span className="text-red-500">*</span>
          </Label>
          <Input id="name" placeholder="Product name" {...register('name')} />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter product description"
            className="min-h-[100px]"
            {...register('description')}
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="logo">Logo URL</Label>
          <Input
            id="logo"
            placeholder="https://example.com/logo.png"
            {...register('logo')}
          />
          {errors.logo && (
            <p className="text-sm text-red-500">{errors.logo.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="websiteUrl">Website URL</Label>
          <Input
            id="websiteUrl"
            placeholder="https://example.com"
            {...register('websiteUrl')}
          />
          {errors.websiteUrl && (
            <p className="text-sm text-red-500">{errors.websiteUrl.message}</p>
          )}
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
            {isSubmitting ? 'Adding...' : 'Add Product'}
          </Button>
        </div>
      </form>
    </div>
  )
}
