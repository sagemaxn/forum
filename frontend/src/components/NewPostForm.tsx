import { Form, Formik } from 'formik';
import { Button, Flex } from '@chakra-ui/react';
import { useApolloClient } from '@apollo/client';

import FormField from '../components/FormField';
import { usePostMutation } from '../generated/graphql';
import { CurrentUserAvatarDocument } from '../generated/graphql';

function NewPostForm({ user, thread_id }) {
    const [post, { data }] = usePostMutation();
    const apolloClient = useApolloClient();
    return (
        <Formik
            initialValues={{ username: user, content: '', thread_id }}
            onSubmit={async (values, actions) => {
                await apolloClient.query({
                    query: CurrentUserAvatarDocument,
                    variables: { username: user },
                });

                await post({ variables: { input: { ...values } } });
                actions.setSubmitting(false);
            }}
        >
            {props => (
                <>
                    <Flex
                        backgroundColor="blue"
                        boxShadow={'xl'}
                        direction={'column'}
                        margin="2px"
                        p={6}
                        w={'100%'}
                        //border="solid 1px"
                    >
                        <Form>
                            <FormField name="content"></FormField>

                            <Button
                                backgroundColor="mint"
                                isLoading={props.isSubmitting}
                                mt={4}
                                type="submit"
                                w="100%"
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

export default NewPostForm;
