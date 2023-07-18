import { Form, Formik } from 'formik';
import { Button, Flex } from '@chakra-ui/react';
import FormField from '../components/FormField';
import { useCreateThreadMutation } from '../generated/graphql';

function NewThreadForm({ user }) {
    const [createThread, { data }] = useCreateThreadMutation();

    return (
        <Formik
            initialValues={{
                username: user,
                avatar: '',
                title: '',
                firstPostContent: '',
            }}
            onSubmit={async (values, actions) => {
                await createThread({ variables: { input: values } });
                if (data) {
                    console.log(
                        `If data after thread in NewThreadForm.tsx: ${data}`,
                    );
                }
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
                    >
                        <Form>
                            <FormField name="title"></FormField>
                            <FormField name="firstPostContent"></FormField>

                            <Button
                                backgroundColor="mint"
                                isLoading={props.isSubmitting}
                                mt={4}
                                type="submit"
                                w="100%"
                            >
                                Create Thread
                            </Button>
                        </Form>
                    </Flex>
                </>
            )}
        </Formik>
    );
}

export default NewThreadForm;
