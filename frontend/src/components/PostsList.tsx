import Post from "./Post";
import Link from "next/link";
import {Text} from "@chakra-ui/react";
import Thread from "./Thread";
export const PostsList = ({data, user, page}) => {
    if(data) {
        console.log(`data :${JSON.stringify(data)}`)
        return <>   {
            data.threadWithPosts.data.posts.map((post) => {
                console.log(post)
               return <Post
                    content={post.content}
                    user={post.user.username}
                    createdAt={post.createdAt}
                    avatar={post.user.avatar}
                    key={post._id}
                    loggedUser={user}
                    postID={post._id}
                ></Post>
        })
        }
            {
                parseInt(page) * 5 < data.threadWithPosts.total && (
                    <Link href={`/${parseInt(page) + 1}`}>Next Page</Link>
                ) || <Text>end of results</Text>
            }

            {
                parseInt(page) - 1 > 0 && (
                    <Link href={`/${parseInt(page) - 1}`}>Prev Page</Link>
                )
            }
        </>
    }
}