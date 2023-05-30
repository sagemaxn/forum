import { Formik, Form } from "formik";
import {
    Button,
    Flex,
} from "@chakra-ui/react";
import FormField from "../components/FormField";
import { useThreadMutation } from "../generated/graphql";

function NewThreadForm({ user, avatar }) {
    const [createThread, { data }] = useThreadMutation();

    return (
        <Formik
            initialValues={{ username: user, avatar, title: "", content: "" }}
            onSubmit={async (values, actions) => {
                await createThread({ variables: values });
                if (data) {
                    console.log(`If data after post in NewThreadForm.tsx: ${data}`);
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
                            <FormField name="content"></FormField>

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
