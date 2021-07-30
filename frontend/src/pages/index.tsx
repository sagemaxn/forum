import {
  Link as ChakraLink,
  Button
} from '@chakra-ui/react'

import cookie from 'cookie'

import {useByeQuery, useAuthQuery} from '../generated/graphql'
import { Container } from '../components/Container'
import LoginForm from '../components/LoginForm'
import { initializeApollo, addApolloState } from '../lib/apollo'


const Index = ({ctx}) => {
  console.log(ctx)
  const {data} = useByeQuery()
  const auth = useAuthQuery()
  return(
  <Container height="100vh">  
  <div>{JSON.stringify(auth.data)}</div>
  <LoginForm/> 
    <Button onClick={(()=> console.log(data))}></Button>
    <Button onClick={(() => console.log('dsad'))}></Button>
  </Container>
)
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ALL_POSTS_QUERY,
    variables: allPostsQueryVars,
  })

  return addApolloState(apolloClient, {
    props: {},
  })
}

export default Index

  