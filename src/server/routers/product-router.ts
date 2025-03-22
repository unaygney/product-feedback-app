import { j, publicProcedure } from '../jstack'
import { eq } from 'drizzle-orm'
import { HTTPException } from 'hono/http-exception'
import { z } from 'zod'

export const productRouter = j.router({
  getProduct: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input, c }) => {
      const { db } = ctx
      const { slug } = input

      const product = await db.query.product.findFirst({
        where: (p) => eq(p.slug, slug),
        with: {
          suggestions: {
            with: {
              comments: true,
              votes: true,
            },
          },
        },
      })

      if (!product) {
        throw new HTTPException(404, {
          message: 'Product not found',
        })
      }

      return c.superjson(product)
    }),
})
