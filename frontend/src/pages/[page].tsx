import auth from '../lib/auth';
import { compose } from '../lib/compose';
import Navbar from '../components/Navbar';

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

    const { data, loading, error } = useQuery(ThreadsDocument, {
        skip: offset === undefined,
        variables: {
            offset: offset,
            limit: 5,
        },
    });

    if (loading) {
        return <Loading />;
    }

    if (error || offset === undefined) {
        return (
            <Error
                statusCode={500}
                title={error ? error.message : 'Invalid page'}
            />
        );
    }

    return <ThreadsList data={data} page={page} user={decoded.user} />;
};

const Index = ({ decoded }) => {
    return (
        <>
            <Navbar user={decoded.user} />
            <Threads decoded={decoded} />
        </>
    );
};

export const getServerSideProps = compose(auth);
export default Index;
