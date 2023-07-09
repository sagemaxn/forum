import { Formik, Form } from "formik";
import {
  Button,
  Flex,
} from "@chakra-ui/react";
import { useApolloClient} from "@apollo/client";

import FormField from "../components/FormField";
import { usePostMutation } from "../generated/graphql";
import { CurrentUserAvatarDocument} from "../generated/graphql";

function NewPostForm({user, thread_id}) {
  const [post, { data }] = usePostMutation()
    const apolloClient = useApolloClient();
  return (
    <Formik
      initialValues={{ username: user, avatar: '' ,content: '', thread_id }}
      onSubmit={async (values, actions) => {
          const response = await apolloClient.query({
              query: CurrentUserAvatarDocument,
              variables: { username: user },
          });

          const avatar = response.data.currentUser.avatar;

          await post({ variables: {...values, avatar} });
          if(data){
              console.log(`If data after post in NewPostForm.tsx: ${data}`)
          }
          actions.setSubmitting(false);
      }}
    >
      {(props) => (<>

          <Flex
        w={"100%"}
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
