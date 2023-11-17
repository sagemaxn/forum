import auth from '../lib/auth';
import { compose } from '../lib/compose';
import Layout from '../components/Layout';

import { useRouter } from 'next/router';
import Error from 'next/error';
import { ThreadsDocument } from '../generated/graphql';
import { useQuery } from '@apollo/client';
import { ThreadsList } from '../components/ThreadsList';
import { Loading } from '../components/Loading';

const Threads = ({ decoded }) => {
    const router = useRouter();
    const { page: pageQuery } = router.query;
    const page = typeof pageQuery === 'string' ? pageQuery : undefined;

    const offset =
        page && parseInt(page, 10) ? parseInt(page, 10) * 5 - 5 : undefined;

    const { data, loading, error, refetch } = useQuery(ThreadsDocument, {
        skip: offset === undefined,
        variables: {
            offset: offset,
            limit: 5,
        },
    });
    const totalPages = Math.ceil(data?.threads?.total / 5);
    if (parseInt(page) > totalPages) {
        return (
            <Error
                statusCode={404}
                title="Oops! The page you are looking for can't be found"
            />
        );
    }

    if (loading) {
        return (
            <Layout user={decoded.user}>
                <Loading />;
            </Layout>
        );
    }

    if (error || offset === undefined) {
        return (
            <Error
                statusCode={500}
                title={error ? error.message : 'Invalid page'}
            />
        );
    }

    return (
        <Layout user={decoded.user}>
            <ThreadsList
                data={data}
                page={page}
                refetch={refetch}
                user={decoded.user}
            />
        </Layout>
    );
};

const Index = ({ decoded }) => {
    return (
        <>
            <Threads decoded={decoded} />
        </>
    );
};

export const getServerSideProps = compose(auth);
export default Index;
