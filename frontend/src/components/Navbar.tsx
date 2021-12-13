import {useState, useEffect} from 'react'
import {Flex, Button} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import {
    useLogoutMutation,
  } from "../generated/graphql";

function Navbar({toLogin}){
    const [logout] = useLogoutMutation();

    function logoutHandler(){
      toLogin()
        document.cookie ="jid= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
        //useRouter().push('/login')
        
                        
       }

    return (
        <Flex
          as="nav"
          align="center"
          justify="end"
          wrap="wrap"
          padding={6}
          bg="green"
          color="white"
          // {...props}
        >
          <Button
            onClick={() => logoutHandler()
            }
          >
            Logout
          </Button>
        </Flex>
    )
}

export default Navbar
