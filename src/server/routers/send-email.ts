import ForgotPassword from '../../components/emails/forgot-password'
import { j, publicProcedure } from '../jstack'
import { HTTPException } from 'hono/http-exception'
import { z } from 'zod'

export const sendEmailRouter = j.router({
  forgetPassword: publicProcedure
    .input(
      z.object({
        email: z.string().email('Please enter a valid email address'),
        subject: z.string().optional(),
        refreshLink: z.string(),
      })
    )
    .mutation(async ({ ctx, c, input }) => {
      const { email, refreshLink } = input
      const { resend } = ctx

      try {
        const { error } = await resend.emails.send({
          from: 'Product Feedback App <products@guneyunay.com>',
          to: email,
          subject: input.subject || 'Product Feedback App',
          react: ForgotPassword({ refreshLink }),
        })
        if (error) {
          throw new HTTPException(500, {
            message: 'Error sending email',
          })
        }
      } catch (error) {
        console.error(error)
        throw new HTTPException(500, {
          message: 'Error sending email',
        })
      }

      return c.json({ message: 'Email sent!' }, 200)
    }),
})
