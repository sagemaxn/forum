import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../../src/lib/apollo";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps);

  return (
    <>
      <ApolloProvider client={client}>
        <ChakraProvider resetCSS theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
