import { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  Button,
  Input,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Link,
} from "@chakra-ui/react";

import FormField from "../components/FormField";
import { useLoginMutation } from "../generated/graphql";
import { bool } from "yup";
import {useRouter} from 'next/router'

function LoginForm({setForm, form}) {
  const [login, { data }] = useLoginMutation();
  const [toggle, setToggle] = useState(true);
  const [boolean, setBoolean] = useState(true)

  interface valuesInt {
    password: string;
    username: string;
  }
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={async (values, actions) => {
        await login({ variables: values });
        //useRouter().push('/')
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Form>
          <FormField name="username"></FormField>
          <FormField name="password" toggle={toggle}></FormField>

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
