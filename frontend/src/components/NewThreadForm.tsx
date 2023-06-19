import { Formik, Form } from "formik";
import {
    Button,
    Flex,
} from "@chakra-ui/react";
import FormField from "../components/FormField";
import { useCreateThreadMutation } from "../generated/graphql";

function NewThreadForm({ user }) {
    const [createThread, { data }] = useCreateThreadMutation();

    return (
        <Formik
            initialValues={{ username: user, avatar: "", title: "", firstPostContent: "" }}
            onSubmit={async (values, actions) => {
                await createThread({ variables: {input: values} });
                if (data) {
                    console.log(`If data after thread in NewThreadForm.tsx: ${data}`);
                }
                actions.setSubmitting(false);
            }}
        >
            {(props) => (
                <>
                    <Flex
                        w={{ md: "xl", base: "100%" }}
                        boxShadow={"xl"}
                        p={6}
                        direction={"column"}
                        margin="2px"
                        backgroundColor="blue"
                    >
                        <Form>
                            <FormField name="title"></FormField>
                            <FormField name="firstPostContent"></FormField>

                            <Button
                                mt={4}
                                backgroundColor="mint"
                                w="100%"
                                isLoading={props.isSubmitting}
                                type="submit"
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
