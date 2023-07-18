import { Flex, Heading, Link, Text, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
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
                    {parseInt(page) - 1 > 0 && (
                        <Link
                            as={NextLink}
                            href={`/user/${user}/${parseInt(page) - 1}`}
                        >
                            Prev Page
                        </Link>
                    )}
                    {parseInt(page) * 5 < data.userActivity.total ? (
                        <Link
                            as={NextLink}
                            href={`/user/${user}/${parseInt(page) + 1}`}
                        >
                            Next Page
                        </Link>
                    ) : (
                        <Text>End of results</Text>
                    )}
                </Flex>
            </>
        );
    }
};

export default UserProfile;
