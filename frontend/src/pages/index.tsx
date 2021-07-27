import {
  Link as ChakraLink,
  Button
} from '@chakra-ui/react'
import { getDataFromTree } from '@apollo/client/react/ssr'
import cookie from 'cookie'
import withApollo from '../lib/apollo'

import {useByeQuery, useAuthQuery} from '../generated/graphql'
import { Container } from '../components/Container'
import LoginForm from '../components/LoginForm'


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


export default withApollo(Index, {getDataFromTree})

  