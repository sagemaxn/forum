import { Flex, Button } from "@chakra-ui/react";
import { decode, verify } from "jsonwebtoken";
import  Link  from 'next/link'
import {
  Heading
} from "@chakra-ui/react";
import { useRouter } from "next/router";
// import { useAuthQuery } from "../generated/graphql";

import Menu from './Menu'
import auth from "../lib/auth";
import {compose} from '../lib/compose'

function Navbar({user}) {
  const Router = useRouter();
  if(Router.pathname === '/login'){
    return null
  }

  return (
    <>
    <Flex
      direction="row"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      color="black"
      borderBottom="1px"
      height="50px"
      width={{base: "100%", md: "xl"}}
    >
        <Heading as="h1" size="sm">
          <Link href={'/'}>Home</Link>
        </Heading>
      <Menu user={user}/>
    </Flex>
    </>
  );
}

export const getServerSideProps = compose(auth)

export default Navbar;
