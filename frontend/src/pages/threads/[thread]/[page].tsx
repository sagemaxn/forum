import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import NewPostForm from '../../../components/NewPostForm';
import Navbar from '../../../components/Navbar';
import { PostsList } from '../../../components/PostsList';
import { ThreadWithPostsDocument } from '../../../generated/graphql';
import Error from 'next/error';
import { Loading } from '../../../components/Loading';
import auth from '../../../lib/auth';
import { compose } from '../../../lib/compose';

const Page = ({ decoded }) => {
    const router = useRouter();
    const { thread: threadQuery, page: pageQuery } = router.query;
    const thread = typeof threadQuery === 'string' ? threadQuery : undefined;
    const page = typeof pageQuery === 'string' ? pageQuery : undefined;

    const offset =
        page && parseInt(page, 10) ? parseInt(page, 10) * 5 - 5 : undefined;

    const { data, loading, error } = useQuery(ThreadWithPostsDocument, {
        skip: offset === undefined,
        variables: {
            offset: offset,
            limit: 5,
            threadWithPostsId: thread,
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

    return (
        <>
            <Navbar user={decoded.user} />
            <NewPostForm thread_id={thread} user={decoded.user} />
            <PostsList data={data} page={page} user={decoded.user} />
        </>
    );
};

export const getServerSideProps = compose(auth);

export default Page;
