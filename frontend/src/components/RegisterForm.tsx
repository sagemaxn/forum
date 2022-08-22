import { Button, Flex, Box, Heading } from "@chakra-ui/react";
import { Formik, Form, ErrorMessage } from "formik";
import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import * as Yup from "yup";
import FormField from "../components/FormField";
import { useRegMutation } from "../generated/graphql";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot be more than 20 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(3, "Password must be at least 3 characters")
    .max(20, "Password must be at most 20 characters")
    .required("Password is required"),
  confirmPassword: Yup.string().required(),
  //must match
  //.oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

function RegisterForm({ setForm, form }) {
  const [toggle, setToggle] = useState(true);
  const [register, { data }] = useRegMutation();
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={SignupSchema}
      onSubmit={async (values, actions) => {
        //check requirements
        //if
        //make register check if username already exists
        await register({ variables: values });

        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Box background="white" padding="5" borderRadius="5%" w="md">
          <Heading margin="4" textAlign="center">Sign Up</Heading>
          <Form>
            <FormField name="username"></FormField>
            <ErrorMessage name="username" component="div" />
            <FormField name="password" toggle={toggle}></FormField>
            <ErrorMessage name="password" component="div" />

            <FormField name="passwordConfirm" toggle={toggle}></FormField>
            <ErrorMessage name="passwordConfirm" component="div" />
            <Flex justifyContent="space-between">
              <Button
                mt={4}
                w="100%"
                isLoading={props.isSubmitting}
                type="submit"
                background="blue"
                color="white"
              >
                Sign up
              </Button>
              <Button onClick={() => setToggle(!toggle)} mt={4}>
                {toggle ? <HiEyeOff /> : <HiEye />}
              </Button>
            </Flex>
            <Button onClick={() => setForm('login')} background="mint" mt={4} w="100%">
                Login
              </Button>
          </Form>
        </Box>
      )}
    </Formik>
  );
}

export default RegisterForm;
