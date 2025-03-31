import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
} from '@react-email/components'
import React from 'react'

interface ForgotPasswordEmailProps {
  refreshLink: string
}

const ForgotPasswordEmail: React.FC<ForgotPasswordEmailProps> = ({
  refreshLink,
}) => (
  <Html>
    <Head />
    <Preview>Forgot your password?</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Create a new password</Heading>
        <Link
          href={refreshLink}
          target="_blank"
          style={{
            ...link,
            display: 'block',
            marginBottom: '16px',
          }}
        >
          Click here to set a new password
        </Link>
      </Container>
    </Body>
  </Html>
)

export default ForgotPasswordEmail

const main = {
  backgroundColor: '#ffffff',
}

const container = {
  paddingLeft: '12px',
  paddingRight: '12px',
  margin: '0 auto',
}

const h1 = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
}

const link = {
  color: '#2754C5',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  textDecoration: 'underline',
}
