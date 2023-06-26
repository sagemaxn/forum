import {Text, Link, VStack, Box, Flex} from "@chakra-ui/react";
import NextLink from "next/link";
import Post from "./Post";
import Thread from "./Thread";

const UserProfile = ({user, data, page, loggedUser}) => {
    if(data) {
        return (
            <>
            <VStack spacing={6} align="stretch">
                {
                    data.userActivity.data.map((activity) => {
                        if(activity.__typename === 'Thread') {
                            return (
                                <>
                                    <Flex align="center" mb={2}>
                                        <Text>{user} made a new thread titled</Text>
                                        <Link as={NextLink} href={`/threads/${activity._id}`}>
                                            <Text as="a" ml={1}>{activity.title}</Text>
                                        </Link>
                                    </Flex>
                                    <Thread {...activity} user={activity.user.username} avatar={activity.user.avatar} loggedUser={user} />
                                    with the following first post
                                    <Post {...activity.posts[0]} user={activity.user.username} avatar={activity.user.avatar} loggedUser={user} />
                                </>
                            );
                        }
                        else if(activity.__typename === 'Post') {
                            return (
                                <>
                                    <Flex align="center" mb={2}>
                                        <Text>{user} made a post in</Text>
                                        <Link as={NextLink} href={`/threads/${activity.thread._id}`}>
                                            <Text as="a" ml={1}>{activity.thread.title}</Text>
                                        </Link>
                                    </Flex>
                                    <Post {...activity} user={activity.user.username} avatar={activity.user.avatar} loggedUser={user} />
                                </>
                            );
                        }
                    })
                }


            </VStack>
                <>
                    {parseInt(page) - 1 > 0 && (
                        <Link as={NextLink} href={`/user/${user}/${parseInt(page) - 1}`}>Prev Page</Link>
                    )}
                    {parseInt(page) * 5 < data.userActivity.total ? (
                        <Link as={NextLink} href={`/user/${user}/${parseInt(page) + 1}`}>Next Page</Link>
                    ) : (
                        <Text>End of results</Text>
                    )}
                </>
           </>
        );
    }
}

export default UserProfile;
