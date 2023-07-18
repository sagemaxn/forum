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

//import { useDeleteThreadMutation } from "../generated/graphql";

const Thread = ({ title, user, avatar, createdAt, loggedUser, threadID }) => {
    // const [deleteThread] = useDeleteThreadMutation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    const dateP = new Date(createdAt).toLocaleString();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

                        <AlertDialogBody>Are you sure?</AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={onClose} ref={cancelRef}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme="red"
                                ml={3}
                                onClick={async () => {
                                    try {
                                        //  await deleteThread({ variables: {threadID}});
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
        <Link as={NextLink} href={`/threads/${threadID}/1`}>
            <Flex
                bg="white"
                justifyContent="space-between"
                margin="2px"
                w={'100%'}
            >
                <Flex>
                    <Image
                        alt={avatar}
                        height="80px"
                        objectFit="contain"
                        src={`/${avatar}.png`}
                        style={{
                            padding: '10px',
                        }}
                        width="80px"
                    />
                    <Flex direction="column">
                        <Heading as="h1" size="sm">
                            <Link href={`/user/${user}/1`}>{user}</Link>
                        </Heading>
                        <Text>{dateP}</Text>
                        <Heading as="h2" size="md">
                            {title}
                        </Heading>
                    </Flex>
                </Flex>
                {loggedUser === user ? (
                    <Button onClick={onOpen} padding="10px" variant="ghost">
                        Delete
                    </Button>
                ) : null}
                {/*<ConfirmDelete />*/}
            </Flex>
        </Link>
    );
};

export default Thread;
