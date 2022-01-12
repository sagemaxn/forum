import {useRouter} from 'next/router'
import {Container} from '@chakra-ui/react'

export default function Layout({ children }) {
  if (useRouter().pathname === '/login'){
  return <>{children}</>
  }

  return (
    <>
      <Container centerContent>
      {children}
      </Container>
    </>
  )
}