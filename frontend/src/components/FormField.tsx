import {	useState,
	useEffect,
	useRef,
	TextareaHTMLAttributes,} from "react";
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


interface propTypes {
    name: string,
    toggle?: boolean,
    //validate: (value: string) => string,
    children?: any
  }
function FormField({ name, toggle, children, ...rest }: propTypes, props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const [text, setText] = useState("");
	const [textAreaHeight, setTextAreaHeight] = useState("auto");
	const [parentHeight, setParentHeight] = useState("auto");
  
  useEffect(() => {
		setParentHeight(`${textAreaRef.current!.scrollHeight}px`);
		setTextAreaHeight(`${textAreaRef.current!.scrollHeight}px`);
  }, [text])
  
  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setTextAreaHeight("auto");
		setParentHeight(`${textAreaRef.current!.scrollHeight}px`);
		setText(event.target.value);


  };
  
  return (
        <Field name={name}>
            {({ field, form }) => (
              <FormControl>
                {name !== 'content' ? <><FormLabel htmlFor={name}>{name}</FormLabel> 
                <Input {...field} id={name} placeholder={name} type={toggle ? "password" : "input"}/></>
                : 
                <Textarea {...field} id={name} placeholder="Make New Post"
                ref={textAreaRef}
                //rows={1}
                style={{
                  height: textAreaHeight,
                }}
                color="black"
                onChange={onChangeHandler}></Textarea>
            }
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
  )
}

export default FormField;

