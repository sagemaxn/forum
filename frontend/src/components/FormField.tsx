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


interface propTypes {
    name: string,
    toggle?: boolean,
    //validate: (value: string) => string,
    children?: any
  }
function FormField({ name, toggle, children, ...rest }: propTypes) {
    //console.log(props)
  return (
        <Field name={name}>
            {({ field, form }) => (
              <FormControl>
                <FormLabel htmlFor={name}>{name}</FormLabel>
                <Input {...field} id={name} placeholder={name} type={toggle ? "password" : "input"}/>
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
  )
}

export default FormField;

