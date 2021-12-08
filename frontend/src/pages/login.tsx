import React from 'react'
import {
  useLogoutMutation,
  useLoginMutation,
  useAuthQuery,
  AuthDocument,
} from "../generated/graphql";
import { Container } from "../components/Container";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { initializeApollo, addApolloState,  } from "../lib/apollo";
import { useState, useEffect } from "react";

const login = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [logout] = useLogoutMutation();
    const [form, setForm] = useState(true)
    const [login] = useLoginMutation();
    function logoutHandler(){
        document.cookie ="jid= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
        setLoggedIn(false)
                        
       }
    return (
      <Container height="100vh">
        You must login to continue
      {form ? <LoginForm setForm={setForm} form={form}/> : <RegisterForm setForm={setForm} form={form}/>}
     </Container>
    )
}

export default login

import auth from "../lib/auth";
import {compose} from '../lib/compose'

export const getServerSideProps = compose(auth)