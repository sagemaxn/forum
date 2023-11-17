import { Center, Heading, Link, Text, VStack } from '@chakra-ui/react';
import RegisterForm from '../components/RegisterForm';

const SignUp = () => {
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
                <RegisterForm />
                <Text fontSize="lg">
                    To login click{' '}
                    <Link color="blue" fontWeight="semibold" href="/login">
                        here
                    </Link>
                </Text>
            </VStack>
        </Center>
    );
};

export default SignUp;
