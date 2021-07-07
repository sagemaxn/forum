import { ChakraProvider } from '@chakra-ui/react'

import{ ApolloProvider, ApolloClient, HttpLink, InMemoryCache} from '@apollo/client'
import theme from '../theme'
import { AppProps } from 'next/app'
import { IncomingMessage } from 'http'

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
  uri: 'http://localhost:4000/graphql'
  })
})


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp
