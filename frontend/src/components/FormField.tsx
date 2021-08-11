import React from "react";
import {
    Button,
    Input,
    FormLabel,
    FormControl,
    FormErrorMessage,
    Link,
  } from "@chakra-ui/react";
  import { Formik, Form, Field } from "formik";


function FormField({ name, label, validate, toggle, ...rest }) {
  return (
        <Field name={name} validate={validate}>
            {({ field, form }) => (
              <FormControl>
                <FormLabel htmlFor={name}>username</FormLabel>
                <Input {...field} id={name} placeholder={name} type={toggle ? "password" : "input"}/>
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
  )
}

export default FormField;

