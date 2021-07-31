import {
  Link as ChakraLink,
  Button
} from '@chakra-ui/react'

import cookie from 'cookie'

import {useByeQuery, useAuthQuery} from '../generated/graphql'
import { Container } from '../components/Container'
import LoginForm from '../components/LoginForm'
import { initializeApollo, addApolloState } from '../lib/apollo'


const Index = ({data}) => {
  console.log(data)
  // const {data} = useByeQuery()
  // const auth = useAuthQuery()
  return(
  <Container height="100vh">  
  <div>{JSON.stringify(data)}</div>
  <LoginForm/> 
    <Button onClick={(()=> console.log(data))}></Button>
    <Button onClick={(() => console.log('dsad'))}></Button>
  </Container>
)
}
import {AuthDocument, LoginDocument} from '../generated/graphql'
import {gql} from '@apollo/client'

export async function getServerSideProps() {
  const apolloClient = initializeApollo()
  const login = await apolloClient.query({
    query: gql`
    {
      cookie{
        token
      }
    }
      `,
  })

  const auth = await apolloClient.query({
    query: AuthDocument
  })

  return addApolloState(apolloClient, {
    props: {data: auth, login: login},
  })
}

export default Index

  