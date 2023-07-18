import { Box, Flex, Link, Spacer, Text, Tooltip } from '@chakra-ui/react';
import NextLink from 'next/link';
import { formatDistanceToNow } from 'date-fns';

const UserActivity = ({
    thread_id,
    title,
    createdAt,
    postContent,
    activityType,
}) => {
    const timeAgo = formatDistanceToNow(new Date(createdAt));
    return (
        <Box borderRadius="lg" borderWidth="1px" p={4}>
            <Flex>
                <Box as="span">
                    <NextLink href={`/threads/${thread_id}`} passHref>
                        <Link>
                            <Text as="span">
                                {activityType === 'Thread'
                                    ? 'Made the new thread '
                                    : 'Posted in '}
                                <b>{title}</b>
                            </Text>
                        </Link>
                    </NextLink>
                </Box>
                <Spacer />

                <Tooltip
                    aria-label="Timestamp Tooltip"
                    label={new Date(createdAt).toISOString()}
                >
                    <Text color="gray.500" fontSize="md">
                        {timeAgo} ago
                    </Text>
                </Tooltip>
            </Flex>
            <Box mt={2}>
                <Text>{postContent}</Text>
            </Box>
        </Box>
    );
};

export default UserActivity;
