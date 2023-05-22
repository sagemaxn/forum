import { Heading } from '@chakra-ui/react'
import Link from 'next/link'

import { compose } from '../lib/compose'
import auth from "../lib/auth";
import Navbar from '../components/Navbar'

const Index = ({ decoded }) => {
    console.log( `decode: ${decoded}` )
    return <><Navbar user={decoded.user} avatar={decoded.avatar}/><Heading>Welcome to our website</Heading> <Link href={'/posts/1'}>Posts</Link> </>
}

export const getServerSideProps = compose(auth)
export default Index

