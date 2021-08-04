import {
  Link as ChakraLink,
  Button
} from '@chakra-ui/react'

import cookie from 'cookie'
import {useQuery} from '@apollo/client/react'

import {useByeQuery, useAuthQuery, AuthDocument} from '../generated/graphql'
import { Container } from '../components/Container'
import LoginForm from '../components/LoginForm'
import { initializeApollo, addApolloState } from '../lib/apollo'


  const AUTH = gql`
{
  checkAuth(cookie: $cook){
    refreshToken
  }
}
  `


const Index = ({login, data, token}) => {
  console.log(data)
  // const {data} = useByeQuery()
  const auth = useQuery(AUTH, {variables:{cookie: token}})


  return(
  <Container height="100vh">  
  <div>{JSON.stringify(token)}</div>
  <div>{JSON.stringify(auth)}</div>
  <LoginForm/> 
    <Button onClick={(()=> console.log(data))}></Button>
    <Button onClick={(() => console.log('dsad'))}></Button>
  </Container>
)
}
//import {AuthDocument, LoginDocument} from '../generated/graphql'
import {gql} from '@apollo/client'

export async function getServerSideProps({req, res}) {
  const apolloClient = initializeApollo()
  const cook = req.cookies.jid.substring(4)
  console.log(cook)
  const auth = await apolloClient.query({
    query: AuthDocument,
    variables: {cookie: cook}
  })

  // const auth = await apolloClient.query({
  //   query: AUTH,
  //   variables: {cookie: req.cookies.jid}
  // })

  return addApolloState(apolloClient, {
    props: {data: auth, token: req.cookies.jid || ''},
  })
}

export default Index

  