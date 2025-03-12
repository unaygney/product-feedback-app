import { j, privateProcedure } from '../jstack'

export const userRouter = j.router({
  get: privateProcedure.query(async ({ c, ctx }) => {
    const { user } = ctx

    return c.superjson(user ?? null)
  }),
})
