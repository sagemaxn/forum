import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { Button, Flex, Alert, AlertDescription, AlertIcon, AlertTitle, Box, Heading } from "@chakra-ui/react";
import { HiEye, HiEyeOff } from "react-icons/hi";

import FormField from "../components/FormField";
import { useLoginMutation } from "../generated/graphql";
import { useRouter } from "next/router";

function AlertMessage(){
  return <Alert status="error">
            <AlertIcon />
            <AlertTitle>Wrong password</AlertTitle>
            <AlertDescription>
              
            </AlertDescription>
          </Alert>
}

function LoginForm({ setForm, form }) {
  const [login, { data }] = useLoginMutation({
    onCompleted({ login }) {
      if (data) {
        console.log(data);
      }
    },
  });

  const [toggle, setToggle] = useState(true);
  const [boolean, setBoolean] = useState(true);

  if (data && boolean) {
    if (data.login.token !== "no token") {
      useRouter().push("/");
    }
  }
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={async (values, actions) => {
        await login({ variables: values });
        if(data){
          console.log(data)
          if(data.login.token !== 'no token'){
            console.log('yop')
            useRouter().push('/')
          }
        }
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Box background="white" padding="5" borderRadius="5%" w="md">
        <Heading margin="4" textAlign="center">Login</Heading>
        <Form>
          <FormField name="username"></FormField>
          <FormField name="password" toggle={toggle}>
          </FormField>
          <Flex>
          <Button
            mt={4}
            isLoading={props.isSubmitting}
            type="submit"
            background="blue"
            color="white"
            w="100%"
          >
            Login
          </Button>
          <Button onClick={() => setToggle(!toggle)} mt={4}>
            {toggle ? <HiEyeOff/> : <HiEye/>}
          </Button>         
          </Flex>
          <Button onClick={() => setForm('register')} background="mint" mt={4} w="100%">Sign Up</Button>
        </Form>
        </Box>
      )}
    </Formik>
  );
}

export default LoginForm;
