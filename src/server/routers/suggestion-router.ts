import { j, privateProcedure, publicProcedure } from '../jstack'
import { desc, eq } from 'drizzle-orm'
import { z } from 'zod'

import { createSuggestionSchema } from '@/lib/form-schemas'

import { suggestion } from '@/server/db/schema'

export const suggeestionRouter = j.router({
  create: privateProcedure
    .input(createSuggestionSchema)
    .mutation(async ({ ctx, c, input }) => {
      const { category, description, title } = input
      const { db, user } = ctx

      const post = await db.insert(suggestion).values({
        category,
        description,
        title,
        userId: user.id,
        productId: '1',
      })

      return c.superjson(post)
    }),
  // get: publicProcedure
  //   .input(z.object({ id: uuid() }))
  //   .query(async ({ ctx, c, input }) => {
  //     const { id } = input
  //     const { db } = ctx

  //     const post = await db.select().from(suggestion).where(eq(suggestion.id, id))

  //     return c.superjson(post)
  //   }
})
