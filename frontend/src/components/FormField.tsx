import { Field } from "formik";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import TextareaAutosize from 'react-textarea-autosize';

interface propTypes {
    name: string,
    toggle?: boolean,
    children?: any
}

function FormField({ name, toggle, children, ...rest }: propTypes) {
    return (
        <Field name={name}>
            {({ field, form }) => (
                <FormControl>
                    {InputField(name, field)}
                </FormControl>
            )}
        </Field>
    );

    function InputField(name, field) {
        if (name === "content") {
            return (
                <TextareaAutosize {...field} id={name} placeholder="Make New Post" color="red" style={{width: "100%"}} autoFocus minRows='1' maxLength='120'></TextareaAutosize>
            )
        } else if (name === "title") {
            return (
                <>
                    <FormLabel htmlFor={name} margin="1.5">
                        {name}
                    </FormLabel>
                    <Input {...field} id={name} placeholder="Thread Title" background="white" maxLength='20'/>
                </>
            )
        } else {
            return (
                <>
                    <FormLabel htmlFor={name} margin="1.5">
                        {name}
                    </FormLabel>
                    <Input {...field} id={name} placeholder={name} type={toggle ? "password" : "input"} background="white"/>
                </>
            )
        }
    }
}

export default FormField;
