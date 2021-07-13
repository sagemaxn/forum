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

import {useQuery, gql, parseAndCheckHttpResponse,} from '@apollo/client'
import { GetServerSideProps } from 'next'
import {client} from './_app'

import cookie from 'cookie'
import LoginForm from '../components/LoginForm'


export const getServerSideProps: GetServerSideProps = async(context) => {
  const cook = context.req.headers.cookie 
  let thing = ''
  let parsed: any = ''
  if(cook){
    parsed = cookie.parse(cook)
    thing = parsed.jid
  }
  const TEST = {query: gql`
  query{
    bye
  }`}
  const { data, loading } = await client.query(TEST)
  const test = "test!"
  console.log('serverprops')
  
  return {props: {data, loading, test, jwt: thing}}
}

const Index = ({data, loading, jwt}) => {
  const QUERY = gql`
  query{
    bye
  }
  `
  if(data.loading){
    console.log('loading')
    return <div>...loading</div>
  }
  if(jwt){
    return <div>welcome user</div>
  }
  return(
  <Container height="100vh">  
  <LoginForm/> 
    <Button onClick={(()=> console.log(loading))}></Button>
    <Button onClick={(() => console.log(jwt))}></Button>
  </Container>
)
}


export default Index
