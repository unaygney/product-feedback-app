import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'
import React from 'react'

export default function ForgotPassword({
  refreshLink,
}: {
  refreshLink: string
}) {
  return (
    <Html>
      <Head />
      <Preview>Forgot your password?</Preview>
      <Tailwind>
        <Body className="bg-white">
          <Container className="mx-auto p-4">
            <Section>
              <Heading className="text-2xl font-bold text-gray-800">
                Create a new password
              </Heading>
              <Text className="my-4">
                We received a request to reset your password. If you made this
                request, please click the link below to set a new password.
              </Text>
              <Link
                href={refreshLink}
                target="_blank"
                className="text-blue-600 underline"
              >
                Click here to set a new password
              </Link>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
