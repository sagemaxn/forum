import React from "react";
import { useLogoutMutation, useLoginMutation } from "../generated/graphql";
import { Heading, Button } from "@chakra-ui/react";
import { Container } from "../components/Container";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { initializeApollo, addApolloState } from "../lib/apollo";
import { useState, useEffect } from "react";

const login = ({ auth, token }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [logout] = useLogoutMutation();
  const [form, setForm] = useState("");
  const [login] = useLoginMutation();

  function Forms() {
    if(form === ''){
      return <><Button onClick={() => setForm('register')}>Sign Up</Button> or <Button onClick={() => setForm('login')}>Login</Button></>
    }
    else if (form === "login") {
      return <LoginForm setForm={setForm} form={form} />;
    } else if (form === "register") {
      return <RegisterForm setForm={setForm} form={form} />;
    }
  }

  return (
    <Container height="100vh">
      <Heading> Please login or sign up to enter our website </Heading>
      {Forms()}
    </Container>
  );
};

export default login;

import auth from "../lib/auth";
import { compose } from "../lib/compose";

export const getServerSideProps = compose(auth);
