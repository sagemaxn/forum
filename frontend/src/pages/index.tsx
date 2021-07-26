import {
  Link as ChakraLink,

  Button
} from '@chakra-ui/react'


import { Container } from '../components/Container'

import { gql, parseAndCheckHttpResponse,} from '@apollo/client'
import { GetServerSideProps } from 'next'

//import { initApolloClient } from '

import cookie from 'cookie'
import LoginForm from '../components/LoginForm'
import {withApollo} from '../lib/apollo'
import { Ctx } from 'type-graphql'

import {useQuery} from '@apollo/client/react'


const Query = gql`
  query Query {
    username
  }
`;



const Index = () => {
  const {data} = useQuery(Query)
  return(
  <Container height="100vh">  
  {JSON.stringify(data)}
  <LoginForm/> 
    <Button onClick={(()=> console.log(data))}></Button>
    <Button onClick={(() => console.log('dsad'))}></Button>
  </Container>
)
}

export default withApollo()

  