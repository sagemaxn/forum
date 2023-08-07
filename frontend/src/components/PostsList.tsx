import Post from './Post';
import Link from 'next/link';
import { Text } from '@chakra-ui/react';

export const PostsList = ({ data, user, page, threadID, refetch }) => {
    if (data) {
        console.log(`total posts: ${data.threadWithPosts.total}`);
        return (
            <>
                {' '}
                {data.threadWithPosts.data.posts.map(post => {
                    return (
                        <Post
                            avatar={post.user.avatar}
                            content={post.content}
                            createdAt={post.createdAt}
                            firstPost={post.isFirstPost}
                            key={post._id}
                            loggedUser={user}
                            postID={post._id}
                            refetch={refetch}
                            threadID={threadID}
                            user={post.user.username}
                        ></Post>
                    );
                })}
                {(parseInt(page) * 5 < data.threadWithPosts.total && (
                    <Link href={`/threads/${threadID}/${parseInt(page) + 1}`}>
                        Next Page
                    </Link>
                )) || <Text>end of results</Text>}
                {parseInt(page) - 1 > 0 && (
                    <Link href={`/threads/${threadID}/${parseInt(page) - 1}`}>
                        Prev Page
                    </Link>
                )}
            </>
        );
    }
};
