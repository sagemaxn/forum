import { Heading, Button, Flex, Box, Text } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { useState } from "react";

const login = ({ auth, token }) => {
  const [form, setForm] = useState("login");

  function Forms() {
    if (form === "login") {
      return <LoginForm setForm={setForm} form={form} />;
    } else return   <RegisterForm setForm={setForm} form={form} />
  }

  return <><Heading>Members Only</Heading><Text>Please login or sing up to continue</Text>{Forms()}</>
};

export default login;

import auth from "../lib/auth";
import { compose } from "../lib/compose";

export const getServerSideProps = compose(auth);
