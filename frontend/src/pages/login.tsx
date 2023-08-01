import { Heading, Text } from '@chakra-ui/react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { useState } from 'react';

const Login = ({ decoded }) => {
    console.log('Login decoded.user:', JSON.stringify(decoded));
    const [form, setForm] = useState('login');

    function Forms() {
        if (form === 'login') {
            return <LoginForm setForm={setForm} />;
        }
        return <RegisterForm setForm={setForm} />;
    }

    return (
        <>
            <Heading>Members Only</Heading>
            <Text>Please login or sign up to continue</Text>
            {Forms()}
        </>
    );
};

export default Login;
import auth from '../lib/auth';
import { compose } from '../lib/compose';

export const getServerSideProps = compose(auth);
