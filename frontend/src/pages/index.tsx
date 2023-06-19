import { Heading } from '@chakra-ui/react'
import auth from "../lib/auth";
import { compose } from "../lib/compose";
import Navbar from '../components/Navbar'
import { useQuery } from "@apollo/client";

import NewThreadForm from "../components/NewThreadForm";
import { ThreadsDocument } from "../generated/graphql";
import {Loading} from "../components/Loading";
import {ThreadsList} from "../components/ThreadsList";

const Threads = ({ decoded }) => {
    let page = "1"
    let offset = 0

            const { data, loading, error, fetchMore } = useQuery(ThreadsDocument, {
                variables: {
                    offset: offset,
                    limit: 5,
                },
            });
    if(loading)return <Loading />
           return <ThreadsList data={data} user={decoded.user} page={page}/>

};


const Index = ({ decoded }) => {
    return <><Navbar user={decoded.user}/><Heading>Most Recent Threads</Heading> <NewThreadForm user={decoded.user}/><Threads decoded={decoded}/>
    </>
}
export const getServerSideProps = compose(auth)
export default Index

