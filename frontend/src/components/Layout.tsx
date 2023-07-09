import {useRouter} from 'next/router'
import {Container} from '@chakra-ui/react'

const Layout = ({ children }) => (
<Container centerContent maxW={"700px"}>
      {children}
</Container>)

export default Layout

