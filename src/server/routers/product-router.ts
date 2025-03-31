import { product } from '../db/schema'
import { j, privateProcedure, publicProcedure } from '../jstack'
import { eq } from 'drizzle-orm'
import { HTTPException } from 'hono/http-exception'
import slugify from 'slugify'
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
  getProducts: privateProcedure.query(async ({ ctx, c }) => {
    const { db, user } = ctx

    const products = await db.query.product.findMany({
      where: (p) => eq(p.ownerId, user.id),
    })
    if (!products) {
      throw new HTTPException(404, {
        message: 'No products found',
      })
    }

    return c.superjson(products)
  }),
  createProduct: privateProcedure
    .input(
      z.object({
        name: z.string(),
        slug: z.string(),
        description: z.string().optional(),
        logo: z.string().optional(),
        websiteUrl: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input, c }) => {
      const { db, user } = ctx
      const { name, slug, description, logo, websiteUrl } = input

      const existingProduct = await db.query.product.findFirst({
        where: (p) => eq(p.slug, slug),
      })

      if (existingProduct) {
        throw new HTTPException(400, {
          message: 'Slug already exists',
        })
      }

      const productData = await db.insert(product).values({
        name,
        description,
        slug,
        logo,
        websiteUrl,
        ownerId: user.id,
      })

      if (!productData) {
        throw new HTTPException(500, {
          message: 'Failed to create product',
        })
      }

      return c.superjson('Product created successfully', 201)
    }),
})
