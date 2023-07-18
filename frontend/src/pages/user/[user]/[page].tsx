import { useRouter } from 'next/router';
import Error from 'next/error';

import { useUserActivityQuery } from '../../../generated/graphql';
import auth from '../../../lib/auth';
import { compose } from '../../../lib/compose';
import Navbar from '../../../components/Navbar';
import UserProfile from '../../../components/UserProfile';
import { Loading } from '../../../components/Loading';

const User = ({ decoded }) => {
    const router = useRouter();
    const { user: userQuery, page: pageQuery } = router.query;
    const user = typeof userQuery === 'string' ? userQuery : undefined;
    const page = typeof pageQuery === 'string' ? pageQuery : undefined;
    const offset =
        user && page && parseInt(page, 10)
            ? parseInt(page, 10) * 5 - 5
            : undefined;

    const { data, loading, error } = useUserActivityQuery({
        skip: offset === undefined,
        variables: {
            username: user,
            offset: offset,
            limit: 5,
        },
    });

    if (loading) {
        return (
            <>
                <Navbar user={decoded.user} />
                <Loading></Loading>
            </>
        );
    }

    if (error || offset === undefined) {
        return (
            <>
                <Navbar user={decoded.user} />
                <Error
                    statusCode={500}
                    title={error ? error.message : 'Invalid page'}
                />
            </>
        );
    }

    return (
        <>
            <Navbar user={decoded.user} />
            <UserProfile data={data} page={page as string} user={user} />
        </>
    );
};

export const getServerSideProps = compose(auth);
export default User;
