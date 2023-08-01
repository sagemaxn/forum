import { Button, Flex, Heading, Link, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useRef } from 'react';
import { useRouter } from 'next/router';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    useDisclosure,
} from '@chakra-ui/react';

import { useDeletePostMutation } from '../generated/graphql';
import { useDeleteThreadMutation } from '../generated/graphql';
import { useReactiveVar } from '@apollo/client';
import { avatarVar } from '../lib/apollo';

const Post = ({
    content,
    user,
    avatar,
    createdAt,
    firstPost,
    loggedUser,
    postID,
    threadID,
    refetch,
}) => {
    const router = useRouter();
    const [deletePostMutation] = useDeletePostMutation();
    const [deleteThreadMutation] = useDeleteThreadMutation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    const datePosted = new Date(createdAt).toLocaleString();
    const avatarFromVar = useReactiveVar(avatarVar);
    const currentAvatar = loggedUser === user ? avatarFromVar : avatar;

    const deletePost = async (postID: string) => {
        try {
            await deletePostMutation({
                variables: {
                    postID,
                },
            });
            refetch();
        } catch (err) {
            console.log(err);
        }
    };

    const deleteThread = async (threadID: string) => {
        try {
            await deleteThreadMutation({
                variables: {
                    threadID,
                },
            });
            await router.push('/');
        } catch (err) {
            console.log(err);
        }
    };

    const ConfirmDelete = () => {
        const actions = {
            deletePost: {
                action: deletePost,
                alertBody: 'Are you sure?',
                alertHeader: 'Delete Post',
                variables: postID,
            },
            deleteThread: {
                action: deleteThread,
                alertBody: 'This will delete the thread and anything in it.',
                alertHeader: 'Delete Thread',
                variables: threadID,
            },
        };

        const { action, alertBody, alertHeader, variables } = firstPost
            ? actions.deleteThread
            : actions.deletePost;

        return (
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            {alertHeader}
                        </AlertDialogHeader>

                        <AlertDialogBody>{alertBody}</AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={onClose} ref={cancelRef}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme="red"
                                ml={3}
                                onClick={() => {
                                    action(variables);
                                    onClose();
                                }}
                            >
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        );
    };

    return (
        <Flex bg="white" justifyContent="space-between" margin="2px" w={'100%'}>
            <Flex>
                <Image
                    alt={currentAvatar}
                    height="80px"
                    objectFit="contain"
                    src={`/${currentAvatar}.png`}
                    style={{
                        padding: '10px',
                    }}
                    width="80px"
                />
                <Flex direction="column">
                    <Heading as="h1" size="sm">
                        <Link href={`/user/${user}/1`}>{user}</Link>
                    </Heading>
                    <Text>{datePosted}</Text>
                    <Text>{content}</Text>
                </Flex>
            </Flex>
            {loggedUser === user ? (
                <Button onClick={onOpen} padding="10px" variant="ghost">
                    Delete
                </Button>
            ) : null}
            <ConfirmDelete />
        </Flex>
    );
};

export default Post;
