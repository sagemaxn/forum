import React from 'react'
import Post from './Post'

const UserProfile = ({user}) => {
    return (
        <>
            {user.posts.map(post => <Post content={post.content} user={''}></Post>)}
        </>
    )
}

export default UserProfile
