import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import {
  Button,
  Input,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Link,
  Flex,
  Heading
} from "@chakra-ui/react";
import { HiEye, HiEyeOff } from "react-icons/hi";

import FormField from "../components/FormField";
import { usePostMutation } from "../generated/graphql";
import { bool } from "yup";
import {useRouter} from 'next/router'

function NewPostForm({user, avatar}) {
  const [post, { data }] = usePostMutation()
  console.log(user)
  return (
    <Formik
      initialValues={{ username: user, avatar ,content: '' }}
      onSubmit={async (values, actions) => {
          console.log(user)
        await post({ variables: values });
        if(data){
          console.log(data)
        }
        actions.setSubmitting(false);
      }}
    >
      {(props) => (<>

          <Flex
        w={{md: "xl", base: '100%'}}
        boxShadow={'xl'}
        p={6}
        direction={'column'}
        border="solid"
        borderLeft="1px"
        borderRight="1px"
        borderTop = "0px"
        borderBottom="1px"
        >

           <Form>
          <FormField name="content"></FormField>

          <Button
            mt={4}
            backgroundColor="green"
            w="100%"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Post
          </Button>
          </Form>
          </Flex>
          </>
      
      )}
    </Formik>
  );
}

export default NewPostForm
