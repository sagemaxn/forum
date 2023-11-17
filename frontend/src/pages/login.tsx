import { Center, Heading, Link, Text, VStack } from '@chakra-ui/react';
import LoginForm from '../components/LoginForm';

const Login = () => {
    return (
        <Center height="100vh" p={4}>
            <VStack
                bg="white"
                borderRadius="sm"
                boxShadow="lg"
                maxW="md"
                p={6}
                spacing={6}
                w="full"
            >
                <Heading>The Forums</Heading>
                <Text fontSize="lg">Please login or sign up to continue</Text>
                <LoginForm />
                <Text fontSize={'lg'}>
                    To sign up click{' '}
                    <Link color="blue" fontWeight="semibold" href="/signup">
                        here
                    </Link>
                </Text>
            </VStack>
        </Center>
    );
};

export default Login;
