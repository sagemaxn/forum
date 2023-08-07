import { Box, VStack } from '@chakra-ui/react';
import Navbar from './Navbar';

//Layout has to be placed in each individual page, because Navbar requires a prop from GetServerSideProps and thus cannot be accessed from _app.tsx
const Layout = ({ children, user }) => (
    <>
        <Box position="sticky" top={0} zIndex={1}>
            <Navbar user={user} />
        </Box>
        <Box margin={'auto'} maxWidth="960px" p={[2, 4]} width="100%">
            <VStack spacing={6}>{children}</VStack>
        </Box>
    </>
);
export default Layout;
