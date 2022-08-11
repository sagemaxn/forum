import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { Button, Link, Box, Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/react";
import { HiEye, HiEyeOff } from "react-icons/hi";

import FormField from "../components/FormField";
<<<<<<< Updated upstream
import { useLoginMutation} from "../generated/graphql";
import {useRouter} from 'next/router'
=======
import { useLoginMutation } from "../generated/graphql";
import { useRouter } from "next/router";
>>>>>>> Stashed changes

function LoginForm({ setForm, form }) {

const [hidden, setHidden] = useState(true)
  const [login, { data }] = useLoginMutation({
    onCompleted({ login }) {
      if (data) {
        console.log(data);
      }
    },
  });

  const [toggle, setToggle] = useState(true);
  const [boolean, setBoolean] = useState(true);

  interface valuesInt {
    password: string;
    username: string;
  }

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
            useRouter().push('/')
          }
        }
        else setHidden(false)
        actions.setSubmitting(false);
        
      }}
    >
      {(props) => (
        <Form>
          <FormField name="username"></FormField>
          <FormField name="password" toggle={toggle}>
            {" "}
            <Box onClick={() => setToggle(!toggle)} zIndex="3">
              {toggle ? <HiEyeOff /> : <HiEye />}
            </Box>
          </FormField>

          <Button
            mt={4}
            backgroundColor="green"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Login
          </Button>
          <Link onClick={() => setForm("")}>Back</Link>
          <Alert status="error" hidden={hidden}>
            <AlertIcon />
            <AlertTitle>Wrong username and/or password</AlertTitle>
            <AlertDescription>
              
            </AlertDescription>
          </Alert>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
