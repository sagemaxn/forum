import {Text, Link, VStack, Flex, Heading} from "@chakra-ui/react";
import NextLink from "next/link";
import Post from "./Post";
import Thread from "./Thread";
import UserActivity from "./UserActivity";
import React from "react";

const UserProfile = ({user, data, page}) => {
    if(data) {
        return (
            <><Heading p={4}>{`${user}'s Activity`}</Heading>
                <VStack spacing={6} align="stretch" w={"full"}>
                    {
                        data.userActivity.data.map((activity) => {

                            if(activity.__typename === 'Thread') {
                                return (
                                    <UserActivity
                                        thread_id={activity._id}
                                        title={activity.title}
                                        createdAt={activity.createdAt}
                                        postContent={activity.posts[0].content}
                                        activityType='Thread'
                                    />
                                );
                            }
                            else if(activity.__typename === 'Post') {
                                return (
                                    <UserActivity
                                        thread_id={activity.thread._id}
                                        title={activity.thread.title}
                                        createdAt={activity.createdAt}
                                        postContent={activity.content}
                                        activityType='Post'
                                    />
                                )
                            }
                        })
                    }
                </VStack>
                <Flex mt={4} justify="space-between">
                    {parseInt(page) - 1 > 0 && (
                        <Link as={NextLink} href={`/user/${user}/${parseInt(page) - 1}`}>Prev Page</Link>
                    )}
                    {parseInt(page) * 5 < data.userActivity.total ? (
                        <Link as={NextLink} href={`/user/${user}/${parseInt(page) + 1}`}>Next Page</Link>
                    ) : (
                        <Text>End of results</Text>
                    )}
                </Flex>
            </>
        );
    }
}

export default UserProfile;
