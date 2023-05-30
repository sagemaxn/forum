// components/Thread.tsx
import {
    Box,
    Text,
    Heading,
    Flex,
    Link,
    Button,
    border,
} from "@chakra-ui/react";
import Image from 'next/image'
import { useRef } from "react";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
} from "@chakra-ui/react";

//import { useDeleteThreadMutation } from "../generated/graphql";

const Thread = ({ title, user, avatar, createdAt, loggedUser, threadID }) => {
   // const [deleteThread] = useDeleteThreadMutation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    const dateP = new Date(createdAt).toLocaleString();

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
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={async () => {
                                    try {
                                      //  await deleteThread({ variables: {threadID}});
                                    } catch (err) {
                                        console.log("thread could not be deleted");
                                        console.error(err);
                                    }
                                    onClose()

                                }}
                                ml={3}
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
            w={{ md: "xl", base: "100%" }}
            margin="2px"
            bg="white"
            justifyContent="space-between"
        >
            <Flex>
                <Image
                    objectFit="contain"
                    src={`/${avatar}.png`}
                    width="80px" height="80px"
                    style={{
                        padding:"10px",
                    }}
                />
                <Flex direction="column">
                    <Heading as="h1" size="sm">
                        <Link href={`/user/${user}/1`}>{user}</Link>
                    </Heading>
                    <Text>{dateP}</Text>
                    <Link href={`/threads/{threadID}`}><Heading as="h2" size="md">{title}</Heading></Link>
                </Flex>
            </Flex>
            {loggedUser === user ? <Button onClick={onOpen} padding="10px" variant='ghost'>Delete</Button> : null}
            {/*<ConfirmDelete />*/}
        </Flex>
    );
};

export default Thread