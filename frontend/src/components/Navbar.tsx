import { useState, useEffect } from "react";
import { Flex, Button, Box } from "@chakra-ui/react";
import { decode, verify } from "jsonwebtoken";
import { Menu, MenuButton, MenuList, MenuItem, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useLogoutMutation } from "../generated/graphql";
// import { useAuthQuery } from "../generated/graphql";

function Navbar(props) {
  const [logout, {data}] = useLogoutMutation();

  const Router = useRouter();

  if(data){
    if(data.logout){
      useRouter().push('/login')
    }
  }

  return (
    <>
      <Flex
        direction="row-reverse"
        as="nav"
        align="center"
        justify="end"
        wrap="wrap"
        color="black"
        borderBottom="1px"
        height="50px"
        pos="fixed"
        width="100%"
      >
        <Menu>
          <MenuButton as={Text}>{props.user}</MenuButton>
          <MenuList>
          <MenuItem>
              Change Avatar
            </MenuItem>
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
              <Box height="50px"></Box>
              </>
  );
}

export default Navbar;
