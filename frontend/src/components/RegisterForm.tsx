import {
  Button,
  Input,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Link,
  Text
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import { useRegMutation } from "../generated/graphql";
import * as Yup from "yup";
import FormField from "../components/FormField";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(3, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  //email: Yup.string().email('Invalid email').required('Required'),
});

function RegisterForm({setForm, form}) {
  const [toggle, setToggle] = useState(true);
  const [register, { data }] = useRegMutation();
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={SignupSchema}
      onSubmit={async (values, actions) => {
        await register({ variables: values });

        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Form>
          <FormField name="username"></FormField>

          <FormField name="password" toggle={toggle}></FormField>
          <FormField name="password" toggle={toggle}></FormField>
          <Button onClick={() => setToggle(!toggle)}>
            {toggle ? "unmask password" : "mask password"}
          </Button>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Sign Up
          </Button>
          <Link onClick={(()=> setForm(!form))}>Back to login</Link>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm;
