import { Box, Text, Heading, Flex, Image, Link } from "@chakra-ui/react";
import { create } from "lodash";

  // <Container maxW={"7xl"}>
  //     <Stack
  //       align={"center"}
  //       spacing={{ base: 8, md: 10 }}
  //       py={{ base: 2, md: 10 }}
  //       direction={{ base: "column" }}
  //     ></Stack>

const Post = ({ content, user, createdAt }) => {
  const d = new Date(createdAt).toLocaleString() 
  return (
    <Flex
      w={{md: "xl", base: '100%'}}
      border="solid 0.5px"
      borderTop="0"
      bg="white"
    >
        <Image
        borderRadius='full'
        padding="10px"
        boxSize='80px'
        objectFit="cover"
          src={
            "https://assets-global.website-files.com/6005fac27a49a9cd477afb63/60576840e7d265198541a372_bavassano_homepage_gp.jpg"
          }
        />
        <Flex direction="column">
        <Heading as='h1' size='sm'>
            <Link href={`/${user}`}>
          {user}
          </Link>
        </Heading>
        <Text>
          {d}
        </Text>
        <Text>
          {content}
        </Text>
        </Flex>
    </Flex>
  );
};

export default Post;
