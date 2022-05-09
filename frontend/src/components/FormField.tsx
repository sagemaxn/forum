import {
    Button,
    Input,
    FormLabel,
    FormControl,
    FormErrorMessage,
    Link,
    Textarea
  } from "@chakra-ui/react";
  import { Formik, Form, Field } from "formik";
  import TextareaAutosize from 'react-textarea-autosize';


interface propTypes {
    name: string,
    toggle?: boolean,
    //validate: (value: string) => string,
    children?: any
  }
function FormField({ name, toggle, children, ...rest }: propTypes) {

  return (
        <Field name={name}>
            {({ field, form }) => (
              <FormControl>
                {name !== 'content' ? <><FormLabel htmlFor={name}>{name}</FormLabel> 
                <Input {...field} id={name} placeholder={name} type={toggle ? "password" : "input"}/></>
                : 
                <TextareaAutosize {...field} id={name} placeholder="Make New Post" color="red" style={{width: "100%"}} autoFocus minRows='1' maxLength='120'></TextareaAutosize>
            }
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
  )
}

export default FormField;

