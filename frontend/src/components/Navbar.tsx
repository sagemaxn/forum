import { useState, useEffect } from "react";
import { Flex, Button } from "@chakra-ui/react";
import { decode, verify } from "jsonwebtoken";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useLogoutMutation } from "../generated/graphql";

function Navbar(pageProps, {ctx}) {
  const [logout, { data }] = useLogoutMutation();
  const Router = useRouter();

  return (
    <Flex
      direction="row-reverse"
      as="nav"
      align="center"
      justify="end"
      wrap="wrap"
      color="black"
      borderBottom="1px"
      height="50px"
    >
      <Menu>
        <MenuButton as={Text}>
          Actions
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={async () => {
              logout();
            }}
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}

export default Navbar;
