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
import {FormField} from '../components/FormField'

function RegisterForm() {
  const [toggle, setToggle] = useState(true);
  const [register, { data }] = useRegMutation();
  function validateName(value: string) {
    let error: string;
    if (!value) {
      error = "username is required";
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
          <FormField>

          </FormField>
         <FormField>
         <Button onClick={() => setToggle(!toggle)}>
                  {toggle ? "unmask password" : "mask password"}
                </Button>
         </FormField>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Register
          </Button>
          <Link href="/">Back</Link>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm;
