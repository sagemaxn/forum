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
import { initializeApollo } from 'src/apollo'

import cookie from 'cookie'
import LoginForm from '../components/LoginForm'

import { parseBody } from 'next/dist/next-server/server/api-utils'


export const getServerSideProps: GetServerSideProps = async(context) => {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: query
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    }
  }
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
