// components/Thread.tsx
import { Button, Flex, Heading, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import { useReactiveVar } from '@apollo/client';
import { avatarVar } from '../lib/apollo';

import { useDeleteThreadMutation } from '../generated/graphql';

const Thread = ({
    title,
    user,
    avatar,
    createdAt,
    loggedUser,
    threadID,
    refetch,
}) => {
    const [deleteThread] = useDeleteThreadMutation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    const datePosted = new Date(createdAt).toLocaleString();
    const avatarFromVar = useReactiveVar(avatarVar);
    const currentAvatar = loggedUser === user ? avatarFromVar : avatar;

    const ConfirmDelete = () => {
        return (
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Thread
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            This will delete the thread and anything in it.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={onClose} ref={cancelRef}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme="red"
                                ml={3}
                                onClick={async () => {
                                    try {
                                        await deleteThread({
                                            variables: { threadID },
                                        });
                                        refetch();
                                    } catch (err) {
                                        console.log(
                                            'thread could not be deleted',
                                        );
                                        console.error(err);
                                    }
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
        <Flex
            bg="white"
            boxShadow={'md'}
            justifyContent="space-between"
            margin="2px"
            w={'100%'}
        >
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
                        <Link as={NextLink} href={`/user/${user}/1`}>
                            {user}
                        </Link>
                    </Heading>
                    <Text>{datePosted}</Text>
                    <Heading as="h2" size="md">
                        <Link as={NextLink} href={`/threads/${threadID}/1`}>
                            {title}
                        </Link>
                    </Heading>
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

export default Thread;
