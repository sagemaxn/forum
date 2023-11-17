import { Flex } from '@chakra-ui/react';
import Link from 'next/link';
import { Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
// import { useAuthQuery } from "../generated/graphql";

import Menu from './Menu';

const Navbar = ({ user }) => {
    const router = useRouter();
    if (router.pathname === '/login' || router.pathname === '/signup') {
        return null;
    }

    return (
        <>
            <Flex
                align="center"
                as="nav"
                bg={'green'}
                color="black"
                direction="row"
                height="50px"
                justify="space-between"
                padding="3px 16px"
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
