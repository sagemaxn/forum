import { Flex, Button } from "@chakra-ui/react";
import  Link  from 'next/link'
import {
  Heading
} from "@chakra-ui/react";
import { useRouter } from "next/router";
// import { useAuthQuery } from "../generated/graphql";

import Menu from './Menu'

const Navbar = ({user}) => {
  const router = useRouter();
  if(router.pathname === '/login'){
    return null
  }

  return (
    <>
    <Flex
    padding="3px"
    
      direction="row"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      color="black"
      
      height="50px"
      width={"100%"}
    >
        <Heading as="h1" size="sm">
          <Link href={'/'}>Home</Link>
        </Heading>
      <Menu user={user}/>
    </Flex>
    </>
  );
}

export default Navbar;
