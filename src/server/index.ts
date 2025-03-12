import { cors } from 'hono/cors'

import { auth } from '@/lib/auth'

import { j } from './jstack'
import { postRouter } from './routers/post-router'

/**
 * This is your base API.
 * Here, you can handle errors, not-found responses, cors and more.
 *
 * @see https://jstack.app/docs/backend/app-router
 */
const api = j
  .router()
  .basePath('/api')
  .on(['POST', 'GET'], '/auth/**', (c) => auth.handler(c.req.raw))
  .use(
    cors({
      origin: [
        'http://localhost:3000',
        'http://localhost:8080',
        'https://product-feedback-app-pied.vercel.app',
        'https://97aa9034-product-feedback-app.bery.workers.dev',
      ],
      allowHeaders: ['x-is-superjson', 'Content-Type', 'Authorization'],
      exposeHeaders: ['x-is-superjson', 'Content-Length'],
      allowMethods: ['GET', 'POST', 'OPTIONS' /* , "DELETE", "PUT" */],
      credentials: true,
      maxAge: 600,
    })
  )
  .onError(j.defaults.errorHandler)
/**
 * This is the main router for your server.
 * All routers in /server/routers should be added here manually.
 */
const appRouter = j.mergeRouters(api, {
  post: postRouter,
})

export type AppRouter = typeof appRouter

export default appRouter
