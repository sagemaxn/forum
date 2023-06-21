import React from 'react'
import Post from './Post'
import Thread from "./Thread";
import Link from "next/link";
import {Text} from "@chakra-ui/react";

const UserProfile = ({user, data, page, loggedUser}) => {
    if(data) {
        return <>   {
            data.userActivity.data.map((activity) => (
               activity.__typename === 'Thread' ?   <Thread
                   title={activity.title}
                   user={activity.user.username}
                   createdAt={activity.createdAt}
                   avatar={activity.user.avatar}
                   key={activity._id}
                   loggedUser={user}
                   threadID={activity._id}
               ></Thread> :
                   <>{user} made a post in {activity.}
                   <Post
                       content={activity.content}
                       user={activity.user.username}
                       createdAt={activity.createdAt}
                       avatar={activity.user.avatar}
                       key={activity._id}
                       loggedUser={user}
                       postID={activity._id}
                   ></Post>
                   </>
            ))
        }
            {
                parseInt(page) * 5 < data.userActivity.total && (
                    <Link href={`/user/${user}/${parseInt(page) + 1}`}>Next Page</Link>
                ) || <Text>end of results</Text>
            }

            {
                parseInt(page) - 1 > 0 && (
                    <Link href={`/user/${user}/${parseInt(page) - 1}`}>Prev Page</Link>
                )
            }
        </>
    }
}

export default UserProfile
