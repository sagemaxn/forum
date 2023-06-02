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

const Threads = ({ decoded }) => {
    const router = useRouter();
    let page = "1"
    let offset = 0

            const { data, loading, error, fetchMore } = useQuery(ThreadsDocument, {
                variables: {
                    offset: offset,
                    limit: 5,
                },
            });
            if (loading)
                return <></>
if (data){ console.log(`data: ${data}`)}

            return (
                <>
                    {data.threads.data.map((thread) => (
                        <Thread
                            title={thread.title}
                            user={thread.username}
                            createdAt={thread.createdAt}
                            avatar={thread.avatar}
                            key={thread._id}
                            loggedUser={decoded.user}
                            threadID={thread._id}
                        ></Thread>
                    ))}
                    {parseInt(page) * 5 < data.threads.total && (
                        <Link href={`/threads/${parseInt(page) + 1}`}>Next Page</Link>
                    ) || <Text>end of results</Text>}

                    {parseInt(page) - 1 > 0 && (
                        <Link href={`/threads/${parseInt(page) - 1}`}>Prev Page</Link>
                    )}
                </>
            );

};


const Index = ({ decoded }) => {
    console.log( `decode: ${decoded}` )
    return <><Navbar user={decoded.user} avatar={decoded.avatar}/><Heading>Welcome to our website</Heading> <Threads decoded={decoded}/>
    </>
}
export const getServerSideProps = compose(auth)
export default Index

