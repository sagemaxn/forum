import {useState} from 'react'
import {Flex, Button} from '@chakra-ui/react'
import {
    useLogoutMutation,
  } from "../generated/graphql";

const Navbar = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [logout] = useLogoutMutation();

    function logoutHandler(){
        document.cookie ="jid= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
        setLoggedIn(false)
                        
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
