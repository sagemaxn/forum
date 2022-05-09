import { useState, useEffect } from "react";
<<<<<<< HEAD
import { Flex, Button } from "@chakra-ui/react";
import { decode, verify } from "jsonwebtoken";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import { SettingsIcon } from '@chakra-ui/icons'
=======
import { Flex, Button, Box } from "@chakra-ui/react";
import { decode, verify } from "jsonwebtoken";
import { Menu, MenuButton, MenuList, MenuItem, Text } from "@chakra-ui/react";
>>>>>>> 4be8c9a0708d64ceb126529693704829ee6b918a
import { useRouter } from "next/router";
import { useLogoutMutation } from "../generated/graphql";
// import { useAuthQuery } from "../generated/graphql";

<<<<<<< HEAD
import auth from "../lib/auth";
import {compose} from '../lib/compose'

function Navbar({decoded}) {
  const [logout, { data }] = useLogoutMutation();
  const Router = useRouter();
  if(Router.pathname === '/login'){
    return null
  }

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
      width={{base: "100%", md: "xl"}}
    >
      <Menu>
        <MenuButton as={Text}>
          {decoded ? decoded.user : null}
          <SettingsIcon/>
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
=======
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
>>>>>>> 4be8c9a0708d64ceb126529693704829ee6b918a
  );
}

export const getServerSideProps = compose(auth)

export default Navbar;
