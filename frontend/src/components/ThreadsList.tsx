import Thread from "./Thread";
import Link from "next/link";
import {Text} from "@chakra-ui/react";

export const ThreadsList = ({data, user, page}) => (
    <>
        {data.threads.data.map((thread) => (
            <Thread
                title={thread.title}
                user={thread.username}
                createdAt={thread.createdAt}
                avatar={thread.avatar}
                key={thread._id}
                loggedUser={user}
                threadID={thread._id}
            ></Thread>
        ))}
        {parseInt(page) * 5 < data.threads.total && (
            <Link href={`/${parseInt(page) + 1}`}>Next Page</Link>
        ) || <Text>end of results</Text>}

        {parseInt(page) - 1 > 0 && (
            <Link href={`/${parseInt(page) - 1}`}>Prev Page</Link>
        )}
    </>
);