import { ChakraProvider } from '@chakra-ui/react';
import auth from '../lib/auth';
import { compose } from '../lib/compose';

import theme from '../theme';
import { AppProps } from 'next/app';

import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apollo';
function MyApp({ Component, pageProps }: AppProps) {
    const client = useApollo(pageProps);

    return (
        <>
            <ApolloProvider client={client}>
                <ChakraProvider resetCSS theme={theme}>
                    <Component {...pageProps} />
                </ChakraProvider>
            </ApolloProvider>
        </>
    );
}
export const getServerSideProps = compose(auth);
export default MyApp;
