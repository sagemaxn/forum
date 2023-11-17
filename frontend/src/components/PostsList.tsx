import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import Post from './Post';
import Link from 'next/link';

export const PostsList = ({ data, user, page, threadID, refetch }) => {
    if (data) {
        return (
            <>
                {data.threadWithPosts.data.posts.map(post => (
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
                    />
                ))}
                <Flex align="center" justify="space-around" mt={4} w={'200px'}>
                    {parseInt(page) - 1 > 0 ? (
                        <Link
                            href={`/threads/${threadID}/${parseInt(page) - 1}`}
                            passHref
                        >
                            <span>
                                <IconButton
                                    aria-label="Previous page"
                                    icon={<ArrowBackIcon />}
                                />
                            </span>
                        </Link>
                    ) : (
                        // Render an empty box to keep space
                        <Box h="40x" w="40px" />
                    )}
                    <Text>Page {page}</Text>
                    {parseInt(page) * 5 < data.threadWithPosts.total ? (
                        <Link
                            href={`/threads/${threadID}/${parseInt(page) + 1}`}
                            passHref
                        >
                            <span>
                                <IconButton
                                    aria-label="Next page"
                                    icon={<ArrowForwardIcon />}
                                />
                            </span>
                        </Link>
                    ) : (
                        // Render an empty box to keep space
                        <Box h="40px" w="40px" />
                    )}
                </Flex>
            </>
        );
    }
};
