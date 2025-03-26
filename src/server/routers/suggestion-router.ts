import { j, privateProcedure, publicProcedure } from '../jstack'
import { eq } from 'drizzle-orm'
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

      const suggestionResult = await db.query.suggestion.findFirst({
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

      if (!suggestionResult) {
        throw new HTTPException(404, {
          message: 'Suggestion not found',
        })
      }

      return c.superjson(suggestionResult)
    }),

  update: privateProcedure
    .input(
      z.object({
        suggestionId: z.string().uuid(),
        content: createSuggestionSchema,
      })
    )
    .mutation(async ({ ctx, c, input }) => {
      const { suggestionId, content } = input
      const { db, user } = ctx

      const suggestionToUpdate = await db.query.suggestion.findFirst({
        where: (s, { eq }) => eq(s.id, suggestionId),
      })

      if (!suggestionToUpdate) {
        throw new HTTPException(404, { message: 'Suggestion not found' })
      }

      if (user.id !== suggestionToUpdate.userId) {
        throw new HTTPException(403, {
          message: 'You are not allowed to update this suggestion',
        })
      }

      await db
        .update(suggestion)
        .set(content)
        .where(eq(suggestion.id, suggestionId))

      return c.superjson({ message: 'Suggestion updated' })
    }),

  updateStatus: privateProcedure
    .input(
      z.object({
        suggestionId: z.string().uuid(),

        newStatus: z.enum(['planned', 'in-progress', 'live']),
      })
    )
    .mutation(async ({ ctx, c, input }) => {
      const { suggestionId, newStatus } = input
      const { db, user } = ctx

      const suggestionToUpdate = await db.query.suggestion.findFirst({
        where: (s, { eq }) => eq(s.id, suggestionId),
      })

      if (!suggestionToUpdate) {
        throw new HTTPException(404, { message: 'Suggestion not found' })
      }

      if (user.id !== suggestionToUpdate.userId) {
        throw new HTTPException(403, {
          message: 'You are not allowed to update this suggestion',
        })
      }

      await db
        .update(suggestion)
        .set({ status: newStatus })
        .where(eq(suggestion.id, suggestionId))

      return c.superjson({ message: 'Suggestion status updated' })
    }),
})
