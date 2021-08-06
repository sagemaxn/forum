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

import { gql } from "@apollo/client";
import { useLoginMutation } from '../generated/graphql'

const query = {
  query: gql`
    query {
      hello
    }
  `,
};
const MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      token
    }
  }
`;

function LoginForm() {
  const [login, { data }] = useLoginMutation();
  const [toggle, setToggle] = useState(true);

  function validateName(value: string) {
    let error: string;
    if (!value) {
      error = "Name is required";
    }
    return error;
  }

  return (
    <Formik
      initialValues={{}}
      onSubmit={async (values, actions) => {
        console.log(values);
        const data = await login({ variables: values });
        console.log(data);
        
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Form>
          <Field name="username" validate={validateName}>
            {({ field, form }) => (
              <FormControl>
                <FormLabel htmlFor="username">First name</FormLabel>
                <Input {...field} id="username" placeholder="username" />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="password" validate={validateName}>
            {({ field, form }) => (
              <FormControl>
                <FormLabel htmlFor="password">First name</FormLabel>
                <Input
                  {...field}
                  id="password"
                  placeholder="password"
                  type={toggle ? "password" : "input"}
                />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                <Button onClick={() => setToggle(!toggle)}>
                  {toggle ? "unmask password" : "mask password"}
                </Button>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Login
          </Button>
          <Link>Register</Link>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;