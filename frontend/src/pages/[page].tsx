import { Heading } from '@chakra-ui/react'
import Link from 'next/link'
import auth from "../lib/auth";
import { compose } from "../lib/compose";
import Navbar from '../components/Navbar'

import { Text } from "@chakra-ui/react";

import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Thread from "../components/Thread";
import NewThreadForm from "../components/NewThreadForm";
import { useThreadsQuery, ThreadsDocument } from "../generated/graphql";
import {Loading} from "../components/Loading";
import {ThreadsList} from "../components/ThreadsList";


const Threads = ({ decoded }) => {
    const router = useRouter();
    const { page } = router.query;
    let offset = 1;

    if (typeof page === "string") {
        if (parseInt(page, 10)) {
            offset = (parseInt(page) - 1) * 5;

            const { data, loading, error, fetchMore } = useQuery(ThreadsDocument, {
                variables: {
                    offset: offset,
                    limit: 5,
                },
            });
            if(loading)return <Loading />
            return <ThreadsList data={data} user={decoded.user} page={page}/>


        }
    }
};


const Index = ({ decoded }) => {
    console.log( `decode: ${decoded}` )
    return <><Navbar user={decoded.user} avatar={decoded.avatar}/><Threads decoded={decoded}/>



    </>
}

export const getServerSideProps = compose(auth)
export default Index

