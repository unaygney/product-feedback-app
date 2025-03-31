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
          html: `
          <h1>Create a new password</h1>
          <p>We received a request to reset your password. If you made this request, please click the link below to set a new password.</p>
          <a href="${refreshLink}" target="_blank" style="color: #3b82f6; text-decoration: underline;">Click here to set a new password</a>
          <p>If you didn't request this, please ignore this email.</p>
          <p>Thanks,</p>
          <p>The Product Feedback App Team</p>
          `,
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
