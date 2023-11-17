import { Box, Flex, Heading, IconButton, Text, VStack } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import UserActivity from './UserActivity';
import React from 'react';

const UserProfile = ({ user, data, page }) => {
    if (data) {
        return (
            <>
                <Heading p={4}>{`${user}'s Activity`}</Heading>
                <VStack align="stretch" spacing={6} w={'full'}>
                    {data.userActivity.data.map(activity => {
                        if (activity.__typename === 'Thread') {
                            return (
                                <UserActivity
                                    activityType="Thread"
                                    createdAt={activity.createdAt}
                                    key={activity._id}
                                    postContent={activity.posts[0].content}
                                    thread_id={activity._id}
                                    title={activity.title}
                                />
                            );
                        } else if (activity.__typename === 'Post') {
                            return (
                                <UserActivity
                                    activityType="Post"
                                    createdAt={activity.createdAt}
                                    key={activity._id}
                                    postContent={activity.content}
                                    thread_id={activity.thread._id}
                                    title={activity.thread.title}
                                />
                            );
                        }
                    })}
                </VStack>
                <Flex justify="space-between" mt={4}>
                    {parseInt(page) - 1 > 0 ? (
                        <Link
                            href={`/user/${user}/${parseInt(page) - 1}`}
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
                    {parseInt(page) * 5 < data.userActivity.total ? (
                        <Link
                            href={`/user/${user}/${parseInt(page) + 1}`}
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

export default UserProfile;
