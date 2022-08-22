import {
    Input,
    FormLabel,
    FormControl,
  } from "@chakra-ui/react";
  import { Field } from "formik";
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
                {name !== 'content' ? <><FormLabel htmlFor={name} margin="1.5">{name}</FormLabel> 
                <Input {...field} id={name} placeholder={name} type={toggle ? "password" : "input"} background="white"/></>
                : 
                <TextareaAutosize {...field} id={name} placeholder="Make New Post" color="red" style={{width: "100%"}} autoFocus minRows='1' maxLength='120'></TextareaAutosize>
            }
              </FormControl>
            )}
          </Field>
  )
}

export default FormField;

