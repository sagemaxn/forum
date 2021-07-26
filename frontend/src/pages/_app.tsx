import { ChakraProvider } from '@chakra-ui/react'

import theme from '../theme'
import { AppProps } from 'next/app'
import { IncomingMessage } from 'http'

import { ApolloProvider } from '@apollo/client'
//import { useApollo } from '../../src/apollo'

function MyApp({ Component, pageProps }: AppProps) {
  //const client = useApollo(pageProps.initialApolloState)

  return (
   // <ApolloProvider client={client}>
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
    //</ApolloProvider>
  )
}

export default MyApp
