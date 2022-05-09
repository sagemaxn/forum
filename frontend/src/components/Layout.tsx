import {useRouter} from 'next/router'
import {Container} from '@chakra-ui/react'

export default function Layout({ children }) {
  if (useRouter().pathname === '/login'){
  return <>{children}</>
  }

  return (
    <>
<<<<<<< HEAD

=======
>>>>>>> 4be8c9a0708d64ceb126529693704829ee6b918a
      <Container centerContent>
      {children}
      </Container>
    </>
  )
}