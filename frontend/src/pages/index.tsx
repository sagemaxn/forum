import { Link as ChakraLink, Button } from "@chakra-ui/react";

import cookie from "cookie";
import { useQuery } from "@apollo/client/react";
import { decode } from "jsonwebtoken";

import {
  useLogoutMutation,
  useAuthQuery,
  AuthDocument,
} from "../generated/graphql";
import { Container } from "../components/Container";
import LoginForm from "../components/LoginForm";
import { initializeApollo, addApolloState } from "../lib/apollo";

const Index = ({ auth, data, token }) => {
  const [logout] = useLogoutMutation();
  function logoutF() {
    logout;
  }

  if (data) {
    const tok = data.data.checkAuth.token;
    const decoded = decode(tok);
    console.log(decoded);
    if (decode(tok)) {
      return (
        <Container height="100vh">
          {decoded.user}
          <Button onClick={() => logout}>Logout</Button>
        </Container>
      );
    }
  }

  return (
    <Container height="100vh">
      <div>{JSON.stringify(data)}</div>
      <LoginForm />
      <Button onClick={() => console.log(data)}></Button>
      <Button onClick={() => "olknkl"}></Button>
    </Container>
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
