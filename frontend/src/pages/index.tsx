import { Heading } from '@chakra-ui/react';
import Layout from '../components/Layout';
import auth from '../lib/auth';
import { compose } from '../lib/compose';
import { useQuery } from '@apollo/client';

import NewThreadForm from '../components/NewThreadForm';
import { ThreadsDocument } from '../generated/graphql';
import { Loading } from '../components/Loading';
import { ThreadsList } from '../components/ThreadsList';
const Index = ({ decoded }) => {
    const offset = 0;
    const page = 1;
    const { data, loading, refetch } = useQuery(ThreadsDocument, {
        variables: {
            offset: offset,
            limit: 5,
        },
    });

    if (loading) {
        return (
            <Layout user={decoded.user}>
                <Loading />{' '}
            </Layout>
        );
    }

    return (
        <Layout user={decoded.user}>
            <Heading>Most Recent Threads</Heading>
            <NewThreadForm refetch={refetch} user={decoded.user} />
            <ThreadsList
                data={data}
                page={page}
                refetch={refetch}
                user={decoded.user}
            />
        </Layout>
    );
};

export const getServerSideProps = compose(auth);
export default Index;
