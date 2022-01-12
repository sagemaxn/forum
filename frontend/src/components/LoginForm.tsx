import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import {
  Button,
  Input,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Link,
} from "@chakra-ui/react";
import { HiEye, HiEyeOff } from "react-icons/hi";

import FormField from "../components/FormField";
import { useLoginMutation} from "../generated/graphql";
import { bool } from "yup";
import {useRouter} from 'next/router'

function LoginForm({setForm, form}) {
  const [login, { data }] = useLoginMutation({ onCompleted({login}){
   if(data){ console.log(data)}
  }});

  const [toggle, setToggle] = useState(true);
  const [boolean, setBoolean] = useState(true)

  interface valuesInt {
    password: string;
    username: string;
  }

  if (data && boolean){
    if(data.login.token !== 'no token'){
      useRouter().push('/')
    }
  }
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={async (values, actions) => {
        await login({ variables: values });
        if(data){
          console.log(data)
        }
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Form>
          {/* <Button onClick={() => }/> */}
          <FormField name="username"></FormField>
          <FormField name="password" toggle={toggle}></FormField>
          <Button onClick={() => setToggle(!toggle)} zIndex='3'>
            {toggle ? <HiEyeOff/> : <HiEye/>}
          </Button>

          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Login
          </Button>
          <Link onClick={(()=> setForm(!form))}>SignUp</Link>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
