import { Box, Text, Heading, Grid, Image, GridItem, Link } from "@chakra-ui/react";
import { create } from "lodash";

const Post = ({ content, user, createdAt }) => {
  return (
    <Grid
      h="200px"
      templateRows="repeat(3, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={0}
    >
      <GridItem rowSpan={2} colSpan={1} bg="tomato">
        <Image
          src={
            "https://assets-global.website-files.com/6005fac27a49a9cd477afb63/60576840e7d265198541a372_bavassano_homepage_gp.jpg"
          }
        />
      </GridItem>
      <GridItem colSpan={3} bg="papayawhip">
        <Heading as='h1' size='sm'>
            <Link href={`/${user}`}>
          {user}
          </Link>
        </Heading>
      </GridItem>
      <GridItem colStart={5} colEnd={6} bg="green">
        <Text>
          {createdAt}
        </Text>
      </GridItem>
      <GridItem colSpan={4} rowSpan={3} bg="tomato">
        <Text>
          {content}{" "}
        </Text>
      </GridItem>
    </Grid>
  );
};

export default Post;
