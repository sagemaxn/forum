import { createWithApollo } from "./createWithApollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
//import { PaginatedPosts } from "../generated/graphql";
import { NextPageContext } from "next";

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: 'http://localhost:4000/graphql', 
    credentials: "include",
    headers: {
      cookie:
        (typeof window === "undefined"
          ? ctx?.req?.headers.cookie
          : undefined) || "",
    },
    cache: new InMemoryCache(),
  });

export const withApollo = createWithApollo(createClient);


// // lib/withApollo.js
// import withApollo from 'next-with-apollo';
// import {ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


// export default withApollo(
//   ({ initialState }) => {
//     return new ApolloClient({
//       uri: 'http://localhost:4000/graphql',
//       cache: new InMemoryCache().restore(initialState || {})
//     });
//   },
//   {
//     render: ({ Page, props }) => {
//       return (
//         <ApolloProvider client={props.apollo}>
//           <Page {...props} />
//         </ApolloProvider>
//       );
//     }
//   }
// );