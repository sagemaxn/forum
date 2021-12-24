import { useState, useEffect } from "react";
import { Flex, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useLogoutMutation } from "../generated/graphql";

function Navbar(pageProps) {
  const [logout, { data }] = useLogoutMutation();
  const Router = useRouter()

  return (
    <Flex
      as="nav"
      align="center"
      justify="end"
      wrap="wrap"
      padding={6}
      //bg="green"
      color="black"
      borderBottom="1px"
      //border="black"
      // {...props}
    >
      <Button
      bg="grey"
        onClick={async() => {
          logout();
        }}
      >
        Logout
      </Button>
    </Flex>
  );
}

export default Navbar;
