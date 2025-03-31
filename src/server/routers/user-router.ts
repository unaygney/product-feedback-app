import { user as User } from '../db/schema'
import { j, privateProcedure } from '../jstack'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const userRouter = j.router({
  get: privateProcedure.query(async ({ c, ctx }) => {
    const { user } = ctx

    return c.superjson(user ?? null)
  }),
  update: privateProcedure
    .input(
      z.object({
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
    )
    .mutation(async ({ c, ctx, input }) => {
      const { db, user } = ctx
      const { name, image } = input

      if (!user) {
        return c.json({ message: 'User not found' }, 404)
      }

      try {
        await db.update(User).set({ name, image }).where(eq(User.id, user.id))
      } catch (e: unknown) {
        console.error(e)
        return c.json({ message: 'Error updating user' }, 500)
      }

      return c.superjson('User updated!', 200)
    }),
})
