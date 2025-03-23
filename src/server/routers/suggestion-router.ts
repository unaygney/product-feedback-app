import { j, privateProcedure, publicProcedure } from '../jstack'
import { HTTPException } from 'hono/http-exception'
import { z } from 'zod'

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
  get: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(async ({ ctx, c, input }) => {
      const { id } = input
      const { db } = ctx

      const suggestion = await db.query.suggestion.findFirst({
        where: (s, { eq }) => eq(s.id, id),
        with: {
          votes: true,
          comments: {
            with: {
              author: true,
            },
          },
        },
      })

      if (!suggestion) {
        throw new HTTPException(404, {
          message: 'Suggestion not found',
        })
      }

      return c.superjson(suggestion)
    }),
})
