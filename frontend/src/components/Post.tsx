import {
  Box,
  Text,
  Heading,
  Flex,
  Image,
  Link,
  Button,
} from "@chakra-ui/react";
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

import { useDeletePostMutation } from "../generated/graphql";

const Post = ({ content, user, avatar, createdAt, loggedUser, postID }) => {
  const [deletePost] = useDeletePostMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const d = new Date(createdAt).toLocaleString();
  console.log(postID)

  const avatarList = { default: "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg", star: "https://previews.123rf.com/images/jpgon/jpgon1411/jpgon141100521/33774351-illustration-of-a-cute-star-avatar-wearing-glasses.jpg", heart: "https://www.chickensmoothie.com/oekaki/image/image.php?id=2340944&size=large&format=auto&rev=1438546858" };
  const src = avatarList[avatar];

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
              Delete Post
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
                    await deletePost({ variables: {postID}});
                
                  } catch (err) {
                    console.log("post could not be deleted");
                    console.error(err);
                    
                  }
                  
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
      border="solid 0.5px"
      borderTop="0"
      bg="white"
      justifyContent="space-between"
    >
      <Flex>
      <Image
        borderRadius="full"
        padding="10px"
        boxSize="80px"
        objectFit="cover"
        src={src}
      />
      <Flex direction="column">
        <Heading as="h1" size="sm">
          <Link href={`/${user}`}>{user}</Link>
        </Heading>
        <Text>{d}</Text>
        <Text>{content}</Text>
      </Flex>
      </Flex>
      {loggedUser === user ? <Button onClick={onOpen} padding="10px" variant='ghost'>Delete</Button> : null}
        <ConfirmDelete />
    </Flex>
  );
};

export default Post;