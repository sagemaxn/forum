import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { ErrorMessage, Form, Formik } from 'formik';
import { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
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
    confirmPassword: Yup.string().required(),
    //must match
    //.oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

function RegisterForm({ setForm }) {
    const [toggle, setToggle] = useState(true);
    const [register] = useRegMutation();
    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={async (values, actions) => {
                //check requirement
                //make register check if username already exists
                await register({ variables: values });

                actions.setSubmitting(false);
            }}
            validationSchema={SignupSchema}
        >
            {props => (
                <Box background={'white'} borderRadius="5%" padding="5" w="md">
                    <Heading margin="4" textAlign="center">
                        Sign Up
                    </Heading>
                    <Form>
                        <FormField name="username"></FormField>
                        <ErrorMessage component="div" name="username" />
                        <FormField name="password" toggle={toggle}></FormField>
                        <ErrorMessage component="div" name="password" />

                        <FormField
                            name="passwordConfirm"
                            toggle={toggle}
                        ></FormField>
                        <ErrorMessage component="div" name="passwordConfirm" />
                        <Flex justifyContent="space-between">
                            <Button
                                background={'blue'}
                                color="white"
                                isLoading={props.isSubmitting}
                                mt={4}
                                type="submit"
                                w="100%"
                            >
                                Sign up
                            </Button>
                            <Button mt={4} onClick={() => setToggle(!toggle)}>
                                {toggle ? <HiEyeOff /> : <HiEye />}
                            </Button>
                        </Flex>
                        <Button
                            background={'mint'}
                            mt={4}
                            onClick={() => setForm('login')}
                            w="100%"
                        >
                            Login
                        </Button>
                    </Form>
                </Box>
            )}
        </Formik>
    );
}

export default RegisterForm;
