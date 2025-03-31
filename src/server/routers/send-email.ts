// import { j, publicProcedure } from '../jstack'
// import { HTTPException } from 'hono/http-exception'
// import React from 'react'
// import { z } from 'zod'

// import { resend } from '@/lib/resend'

// export const sendEmailRouter = j.router({
//   send: publicProcedure
//     .input(
//       z.object({
//         email: z.string().email('Please enter a valid email address'),
//         subject: z.string().optional(),
//         template: z.any(),
//       })
//     )
//     .mutation(async ({ ctx, c, input }) => {
//       const { email, template } = input

//       try {
//         const { error } = await resend.emails.send({
//           from: 'Product Feedback App <products@guneyunay.com>',
//           to: email,
//           subject: input.subject || 'Product Feedback App',
//           react: template,
//         })

//         if (error) {
//           throw new HTTPException(500, {
//             message: 'Error sending email',
//           })
//         }
//       } catch (error) {
//         console.error(error)
//         throw new HTTPException(500, {
//           message: 'Error sending email',
//         })
//       }

//       return c.json({ message: 'Email sent!' }, 200)
//     }),
// })
