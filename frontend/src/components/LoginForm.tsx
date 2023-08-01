import { useState } from 'react';
import { Form, Formik } from 'formik';
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    Flex,
    Heading,
} from '@chakra-ui/react';

import FormField from '../components/FormField';
import { useLoginMutation } from '../generated/graphql';
import { useRouter } from 'next/router';

function AlertMessage() {
    return (
        <Alert status="error">
            <AlertIcon />
            <AlertTitle>Wrong username or password</AlertTitle>
            <AlertDescription></AlertDescription>
        </Alert>
    );
}

function LoginForm({ setForm }) {
    const router = useRouter();
    const [loginError, setLoginError] = useState(null);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [login] = useLoginMutation({
        onError: error => {
            console.error(error);
            setLoginError(error.message);
        },
        onCompleted: data => {
            console.log(JSON.stringify(data));
            if (data.login.token !== 'no token') {
                setLoginError(null);
                router.push('/').catch(error => {
                    console.error('Failed to redirect:', error);
                });
            } else {
                setLoginError('Wrong username or password');
            }
        },
    });
    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={async (values, actions) => {
                await login({ variables: values });
                actions.setSubmitting(false);
            }}
        >
            {props => (
                <Box
                    background={'white'}
                    borderRadius="5%"
                    padding="5"
                    w="100%"
                >
                    <Heading margin="4" textAlign="center">
                        Login
                    </Heading>
                    {loginError && <AlertMessage />}
                    <Form>
                        <FormField name="username"></FormField>
                        <FormField
                            name="password"
                            passwordVisible={passwordVisible}
                            setPasswordVisible={setPasswordVisible}
                        ></FormField>
                        <Flex>
                            <Button
                                background={'blue'}
                                color="white"
                                isLoading={props.isSubmitting}
                                mt={4}
                                type="submit"
                                w="100%"
                            >
                                Login
                            </Button>
                        </Flex>
                        <Button
                            background={'mint'}
                            mt={4}
                            onClick={() => setForm('register')}
                            w="100%"
                        >
                            Sign Up
                        </Button>
                    </Form>
                </Box>
            )}
        </Formik>
    );
}

export default LoginForm;
