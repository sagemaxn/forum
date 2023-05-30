import { Formik, Form } from "formik";
import {
  Button,
  Flex,
} from "@chakra-ui/react";

import FormField from "../components/FormField";
import { usePostMutation } from "../generated/graphql";

function NewPostForm({user, avatar}) {
  const [post, { data }] = usePostMutation()
  console.log(`New post form avatar prop: ${avatar}`)
  return (
    <Formik
      initialValues={{ username: user, avatar ,content: '' }}
      onSubmit={async (values, actions) => {
        await post({ variables: values });
        if(data){
          console.log(`If data after post in NewPostForm.tsx: ${data}`)
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
        //border="solid 1px"
        margin="2px"
        backgroundColor="blue"
        >

           <Form>
          <FormField name="content"></FormField>

          <Button
            mt={4}
            backgroundColor="mint"
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
