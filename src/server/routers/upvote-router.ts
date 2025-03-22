import { vote } from '../db/schema'
import { j, privateProcedure } from '../jstack'
import { and, eq } from 'drizzle-orm'
import { HTTPException } from 'hono/http-exception'
import { z } from 'zod'

export const upvoteRouter = j.router({
  upvote: privateProcedure
    .input(z.object({ suggestionId: z.string().uuid() }))
    .mutation(async ({ ctx, c, input }) => {
      const { suggestionId } = input
      const { db, user } = ctx

      const suggestion = await db.query.suggestion.findFirst({
        where: (s, { eq }) => eq(s.id, suggestionId),
        with: {
          votes: {
            where: (v, { eq }) => eq(v.userId, user.id),
          },
        },
      })

      if (suggestion?.userId === user.id) {
        throw new HTTPException(400, {
          message: 'You cannot upvote your own suggestion',
        })
      }

      if (suggestion?.votes.length) {
        throw new HTTPException(400, {
          message: 'You have already upvoted this suggestion',
        })
      }

      await db.insert(vote).values({
        suggestionId,
        userId: user.id,
      })

      return c.superjson('Upvoted!', 201)
    }),

  downvote: privateProcedure
    .input(z.object({ suggestionId: z.string().uuid() }))
    .mutation(async ({ ctx, c, input }) => {
      const { suggestionId } = input
      const { db, user } = ctx

      const suggestion = await db.query.suggestion.findFirst({
        where: (s, { eq }) => eq(s.id, suggestionId),
        with: {
          votes: {
            where: (v, { eq }) => eq(v.userId, user.id),
          },
        },
      })

      if (!suggestion?.votes.length) {
        throw new HTTPException(400, {
          message: 'You have not upvoted this suggestion',
        })
      }

      await db
        .delete(vote)
        .where(
          and(eq(vote.suggestionId, suggestionId), eq(vote.userId, user.id))
        )

      return c.superjson('Downvoted!', 201)
    }),

  check: privateProcedure
    .input(z.object({ suggestionId: z.string().uuid() }))
    .query(async ({ ctx, c, input }) => {
      const { suggestionId } = input

      const { db, user } = ctx

      const suggestion = await db.query.suggestion.findFirst({
        where: (s, { eq }) => eq(s.id, suggestionId),
        with: {
          votes: {
            where: (v, { eq }) => eq(v.userId, user.id),
          },
        },
      })

      return c.superjson({
        isVoted: suggestion?.votes.length ? true : false,
      })
    }),
})
