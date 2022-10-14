import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";

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
      <Head>
      <meta http-equiv="Content-Security-Policy" content="default-src 'none'; image-source 'self'"></meta>
        <title>My Next App</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      </Head>
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
