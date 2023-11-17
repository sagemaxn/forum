import { useQuery } from '@apollo/client';
import { Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import NewPostForm from '../../../components/NewPostForm';
import { PostsList } from '../../../components/PostsList';
import Layout from '../../../components/Layout';
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

    const { data, loading, error, refetch } = useQuery(
        ThreadWithPostsDocument,
        {
            //skip: offset === undefined,
            variables: {
                offset: offset,
                limit: 5,
                threadWithPostsId: thread,
            },
        },
    );
    const totalPages = Math.ceil(data?.threadWithPosts?.total / 5);
    if (parseInt(page) > totalPages) {
        return (
            <Error
                statusCode={404}
                title="Oops! The page you are looking for can't be found"
            ></Error>
        );
    }
    if (loading) {
        return (
            <Layout user={decoded.user}>
                <Loading />
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
            <Heading>{data.threadWithPosts.data.title}</Heading>
            <NewPostForm
                refetch={refetch}
                thread_id={thread}
                user={decoded.user}
            />
            <PostsList
                data={data}
                page={page}
                refetch={refetch}
                threadID={thread}
                user={decoded.user}
            />
        </Layout>
    );
};

export const getServerSideProps = compose(auth);

export default Page;
