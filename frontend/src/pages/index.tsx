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

import { gql, parseAndCheckHttpResponse,} from '@apollo/client'
import { GetServerSideProps } from 'next'

//import { initializeApollo } from '../../src/apollo'

import cookie from 'cookie'
import LoginForm from '../components/LoginForm'



const Query = gql`
  query Query {
    name
  }
`;

// export default async function getServerSideProps (context){
//   const apolloClient = initializeApollo()

//   await apolloClient.query({
//     query: Query
//   })

//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//     }
//   }
// }

const Index = ({}) => {

  return(
  <Container height="100vh">  
  <LoginForm/> 
    <Button onClick={(()=> console.log())}></Button>
    <Button onClick={(() => console.log('dsad'))}></Button>
  </Container>
)
}

export default Index
