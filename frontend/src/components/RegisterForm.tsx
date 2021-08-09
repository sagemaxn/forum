import {
  Button,
  Input,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Link,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import { useRegMutation } from "../generated/graphql";

function RegisterForm() {
  const [toggle, setToggle] = useState(true);
  const [register, { data }] = useRegMutation();
  function validateName(value: string) {
    let error: string;
    if (!value) {
      error = "Name is required";
    }
    return error;
  }

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={async (values, actions) => {
        await register({ variables: values });

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
          <Link href="/register">Register</Link>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm;
