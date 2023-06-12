import Post from "./Post";
import Link from "next/link";
import {Text} from "@chakra-ui/react";
export const PostsList = ({data, user, page}) =>
<>{data.threadWithPosts.thread.posts.map((post) => (
    <Post
        content={post.content}
        user={post.username}
        createdAt={post.createdAt}
        avatar={post.avatar}
        key={post._id}
        loggedUser={user}
        postID={post._id}
    ></Post>
))}
{parseInt(page) * 5 < data.total && (
    <Link href={`/threads/${parseInt(page) + 1}`}>Next Page</Link>
) || <Text>end of results</Text>}

{parseInt(page) - 1 > 0 && (
    <Link href={`/threads/${parseInt(page) - 1}`}>Prev Page</Link>
)}</>