import { Flex } from '@chakra-ui/react';
import Link from 'next/link';
import { Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
// import { useAuthQuery } from "../generated/graphql";

import Menu from './Menu';

const Navbar = ({ user }) => {
    console.log('Navbar user:', user);
    const router = useRouter();
    if (router.pathname === '/login') {
        return null;
    }

    return (
        <>
            <Flex
                align="center"
                as="nav"
                color="black"
                direction="row"
                height="50px"
                justify="space-between"
                padding="3px"
                width={'100%'}
                wrap="wrap"
            >
                <Heading as="h1" size="sm">
                    <Link href={'/'}>Home</Link>
                </Heading>
                <Menu user={user} />
            </Flex>
        </>
    );
};

export default Navbar;
