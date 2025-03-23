import { comment } from '../db/schema'
import { j, privateProcedure } from '../jstack'
import { HTTPException } from 'hono/http-exception'
import { z } from 'zod'

export const commentRouter = j.router({
  create: privateProcedure
    .input(
      z.object({
        suggestionId: z.string(),
        parentCommentId: z.string().optional(),
        content: z.string(),
      })
    )
    .mutation(async ({ ctx, c, input }) => {
      const { db, user } = ctx
      const { content, suggestionId, parentCommentId } = input

      try {
        await db.insert(comment).values({
          content,
          suggestionId,
          userId: user.id,
          parentCommentId,
        })
      } catch (e: unknown) {
        console.error(e)
        throw new HTTPException(500, {
          message: 'Error creating suggestion',
        })
      }

      return c.superjson('Comment created!', 201)
    }),
})
