import Thread from './Thread';
import Link from 'next/link';
import { Text } from '@chakra-ui/react';

export const ThreadsList = ({ data, user, page, refetch }) => {
    if (data) {
        return (
            <>
                {' '}
                {data.threads.data.map(thread => (
                    <Thread
                        avatar={thread.user.avatar}
                        createdAt={thread.createdAt}
                        key={thread._id}
                        loggedUser={user}
                        refetch={refetch}
                        threadID={thread._id}
                        title={thread.title}
                        user={thread.user.username}
                    ></Thread>
                ))}
                {(parseInt(page) * 5 < data.threads.total && (
                    <Link href={`/${parseInt(page) + 1}`}>Next Page</Link>
                )) || <Text>end of results</Text>}
                {parseInt(page) - 1 > 0 && (
                    <Link
                        href={`/${
                            parseInt(page) - 1 > 1 ? parseInt(page) - 1 : ''
                        }`}
                    >
                        Prev Page
                    </Link>
                )}
            </>
        );
    }
};
