import { j, privateProcedure } from '../jstack'
import { HTTPException } from 'hono/http-exception'

import { createSuggestionSchema } from '@/lib/form-schemas'

import { suggestion } from '@/server/db/schema'

export const suggeestionRouter = j.router({
  create: privateProcedure
    .input(createSuggestionSchema)
    .mutation(async ({ ctx, c, input }) => {
      const { category, description, title } = input
      const { db, user } = ctx

      const product = await db.query.product.findFirst({
        where: (p, { eq }) => eq(p.ownerId, user.id),
      })

      if (!product) {
        throw new HTTPException(404, {
          message: 'Product not found',
        })
      }

      try {
        await db.insert(suggestion).values({
          category,
          description,
          title,
          userId: user.id,
          productId: product.id,
        })
      } catch (e: unknown) {
        console.error(e)
        throw new HTTPException(500, {
          message: 'Error creating suggestion',
        })
      }

      return c.superjson('Suggestion created!', 201)
    }),
})
