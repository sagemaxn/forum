import { Heading } from '@chakra-ui/react';
import auth from '../lib/auth';
import { compose } from '../lib/compose';
import Navbar from '../components/Navbar';
import { useQuery } from '@apollo/client';

import NewThreadForm from '../components/NewThreadForm';
import { ThreadsDocument } from '../generated/graphql';
import { Loading } from '../components/Loading';
import { ThreadsList } from '../components/ThreadsList';
const Index = ({ decoded }) => {
    const offset = 0;
    const page = 1;
    const { data, loading } = useQuery(ThreadsDocument, {
        variables: {
            offset: offset,
            limit: 5,
        },
    });

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <Navbar user={decoded.user} />
            <Heading>Most Recent Threads</Heading>{' '}
            <NewThreadForm user={decoded.user} />
            <ThreadsList data={data} page={page} user={decoded.user} />
        </>
    );
};

export const getServerSideProps = compose(auth);
export default Index;
