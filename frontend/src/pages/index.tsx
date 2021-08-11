import { Link as ChakraLink, Button, Flex } from "@chakra-ui/react";

import cookie from "cookie";
import { useQuery } from "@apollo/client/react";
import { decode } from "jsonwebtoken";

import {
  useLogoutMutation,
  useLoginMutation,
  useAuthQuery,
  AuthDocument,
} from "../generated/graphql";
import { Container } from "../components/Container";
import LoginForm from "../components/LoginForm";
import { initializeApollo, addApolloState } from "../lib/apollo";
import {useState, useEffect} from 'react'

const Index = ({ auth, data, token }) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [logout] = useLogoutMutation();
  const [login] = useLoginMutation()
  function logoutF() {
    logout;
  }
useEffect(()=>{
  if (data) {
    const tok = data.data.checkAuth.token;
    const decoded = decode(tok);
    console.log(decoded);
    if (decode(tok)) {
      setLoggedIn(true)
    }
    else{
      setLoggedIn(false)
    }
  }},[loggedIn]
)
  return (
    <>
    {!loggedIn && <Container height="100vh">
      <div>{JSON.stringify(data)}</div>
      <LoginForm />
      <Button onClick={() => console.log(data)}></Button>
      <Button onClick={() => "olknkl"}></Button>
  </Container>}

  
      {loggedIn && <> 
        <Flex
    as="nav"
    align="center"
    justify="end"
    wrap="wrap"
    padding={6}
    bg="gold"
    color="white"
   // {...props}
  >
      
        <Button onClick={() => document.cookie = "jid= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"}>Logout</Button>
        </Flex>
        <Container>
          posts
        </Container>
</>}

        </>
 
  );
};
//import {AuthDocument, LoginDocument} from '../generated/graphql'
import { gql } from "@apollo/client";

export async function getServerSideProps({ req, res }) {
  const apolloClient = initializeApollo();
  const cook = req.cookies.jid || "no refresh";
  console.log(cook);
  const auth = await apolloClient.query({
    query: AuthDocument,
    variables: { cookie: cook },
  });

  return addApolloState(apolloClient, {
    props: { data: auth },
  });
}

export default Index;
