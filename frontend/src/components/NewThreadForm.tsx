import { Form, Formik } from 'formik';
import { Button, Flex } from '@chakra-ui/react';
import FormField from '../components/FormField';
import { useCreateThreadMutation } from '../generated/graphql';

function NewThreadForm({ user, refetch }) {
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
                try {
                    await createThread({ variables: { input: values } });
                    refetch();
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
                            <FormField name="title"></FormField>
                            <FormField name="firstPostContent"></FormField>

                            <Button
                                backgroundColor="green"
                                isLoading={props.isSubmitting}
                                mt={4}
                                mx="auto" // Center the button if not full width
                                type="submit"
                                width={['100%', 'auto']} // Button full width on mobile, auto on larger screens
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
