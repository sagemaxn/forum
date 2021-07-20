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
import { getDataFromTree } from '@apollo/client/react/ssr'
import { withApollo } from './_app'
import {client} from './_app'

import cookie from 'cookie'
import LoginForm from '../components/LoginForm'

import { parseBody } from 'next/dist/next-server/server/api-utils'


export const getServerSideProps: GetServerSideProps = async(context) => {
  const isServer = () => typeof window === "undefined"
  //console.log(context.req.headers.cookie)
  const checkAuth = {query: gql`
  query{
    checkAuth{
      refreshToken
    }
    
    
  }
  `}
  
  //if(isServer){
    
    const y = await client.query(checkAuth)
    console.log(y.data)
  //}
  // console.log(data)
 
  const data = "dasdas"
  //console.log(cook + " yoooie
  // let thing = ''
  // let parsed: any = ''
  // if(cook){
  //   parsed = cookie.parse(cook)
  //   console.log(parsed)
  //   thing = parsed.jid
  //   console.log(thing)
    
  // }
  // const TEST = {query: gql`
  // query{
  //   bye
  // }`}
  // const { data, loading } = await client.query(TEST)
  // const test = "test!"
  // console.log('serverprops')
  // thing = "dsa"
  // return {props: {data, loading, test, jwt: thing}}
  return {props: {data, loading: "dasd"}}
}

const Index = ({data}) => {
  const QUERY = gql`
  query{
    bye
  }
  `
  return(
  <Container height="100vh">  
  <LoginForm/> 
    <Button onClick={(()=> console.log())}></Button>
    <Button onClick={(() => console.log(data))}></Button>
  </Container>
)
}


export default withApollo(Index, { getDataFromTree })
