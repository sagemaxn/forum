import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
  Button
} from '@chakra-ui/react'
import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons'

import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'

import {useQuery, useMutation, gql} from '@apollo/client'

const Index: React.FC = () => {
  const QUERY = gql`
  mutation{
    login(input: {username: "mrsmith" password: "password"}){
      token
    }
  }
  `
  const result = useMutation(QUERY)
  if (result[1].loading) {
    return <div>loading...</div>
  }
  
  return(
  <Container height="100vh">
    {JSON.stringify(result[1].data)}
    <Button onClick={(()=> console.log(result[1].data))}></Button>
  </Container>
)
}

export default Index
