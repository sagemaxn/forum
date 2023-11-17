import Thread from './Thread';
import Link from 'next/link';
import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

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
                <Flex align="center" justify="space-around" mt={4} w={'200px'}>
                    {parseInt(page) - 1 > 0 ? (
                        <Link
                            href={`/${
                                parseInt(page) - 1 > 1 ? parseInt(page) - 1 : ''
                            }`}
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
                    {parseInt(page) * 5 < data.threads.total ? (
                        <Link href={`/${parseInt(page) + 1}`} passHref>
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
