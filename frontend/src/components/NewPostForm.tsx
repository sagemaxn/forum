import { Form, Formik } from 'formik';
import { Button, Flex } from '@chakra-ui/react';

import FormField from '../components/FormField';
import { usePostMutation } from '../generated/graphql';

function NewPostForm({ user, thread_id, refetch }) {
    const [post] = usePostMutation();
    return (
        <Formik
            initialValues={{ username: user, content: '', thread_id }}
            onSubmit={async (values, actions) => {
                try {
                    await post({ variables: { input: { ...values } } });
                    refetch();
                    actions.resetForm();
                } catch (err) {
                    console.error(err);
                }
                actions.setSubmitting(false);
            }}
        >
            {props => (
                <>
                    <Flex
                        bg={'white'}
                        boxShadow={'md'}
                        direction={'column'}
                        margin="2px"
                        p={6}
                        w={'100%'}
                    >
                        <Form>
                            <FormField name="content"></FormField>

                            <Button
                                backgroundColor="green"
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
