import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const createSuggestionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.enum(['feature', 'ui', 'ux', 'enhancement', 'bug']),
  description: z.string().min(1, 'Description is required'),
  productSlug: z.string(),
})
export const updateSuggestionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.enum(['feature', 'ui', 'ux', 'enhancement', 'bug']),
  description: z.string().min(1, 'Description is required'),
})

export type CreateSuggestionInput = z.infer<typeof createSuggestionSchema>
export type UpdateSuggestionInput = z.infer<typeof updateSuggestionSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
