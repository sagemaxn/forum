import {
    Box,
    Button,
    Flex,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import FormField from '../components/FormField';
import { useRegMutation } from '../generated/graphql';

const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username cannot be more than 20 characters')
        .required('Username is required'),
    password: Yup.string()
        .min(3, 'Password must be at least 3 characters')
        .max(20, 'Password must be at most 20 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

function RegisterForm() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [register] = useRegMutation();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Formik
            initialValues={{ username: '', password: '', confirmPassword: '' }}
            onSubmit={async (values, actions) => {
                const response = await register({
                    variables: values,
                    onError: error => {
                        actions.setFieldError('username', error.message);
                    },
                });
                if (response && response.data) {
                    onOpen();
                    actions.resetForm();
                }
                actions.setSubmitting(false);
            }}
            validationSchema={SignupSchema}
        >
            {props => (
                <Box borderRadius="sm" p={6} w="100%">
                    <Heading margin="4" textAlign="center">
                        Sign Up
                    </Heading>
                    <Form>
                        <FormField name="username"></FormField>

                        <FormField
                            name="password"
                            passwordVisible={passwordVisible}
                            setPasswordVisible={setPasswordVisible}
                        ></FormField>

                        <FormField
                            name="confirmPassword"
                            passwordVisible={passwordVisible}
                        ></FormField>

                        <Flex justifyContent="space-between">
                            <Button
                                background={'green'}
                                isLoading={props.isSubmitting}
                                mt={4}
                                type="submit"
                                w="100%"
                            >
                                Sign Up
                            </Button>
                        </Flex>
                    </Form>

                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Account created</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                Your account has been successfully created!
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </Box>
            )}
        </Formik>
    );
}

export default RegisterForm;
