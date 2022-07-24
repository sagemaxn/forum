import { useState } from 'react'
import Link from 'next/link'
import {Button} from '@chakra-ui/react'

import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Post from '../components/Post'
import NewPostForm from '../components/NewPostForm'
import Navbar from '../components/Navbar'
import { usePostsQuery, PostsDocument } from "../generated/graphql"

const Page = ({ decoded,  token }) => {
  const router = useRouter();
  const { page } = router.query
  let offset = 1
  let limit = 5
  if( typeof(page) === 'string'){
    if(parseInt(page, 10) ){
      offset = (parseInt(page) -1) * limit

console.log(decoded)
  const { data, loading, error, fetchMore } = useQuery(PostsDocument, {
    variables: {
      offset,
      limit
    }
  })
 if (loading) return <Navbar user={decoded.user} avatar={decoded.avatar}/>
 console.log(data)
  return (
    <>
    <Navbar user={decoded.user} avatar={decoded.avatar}/>
    <NewPostForm user={decoded.user} avatar={decoded.avatar}/>
    {data.posts.data.map(post => <Post content={post.content} user={post.username} createdAt={post.createdAt} avatar={post.avatar} key={post._id} loggedUser={decoded.user} postID={post._id}></Post>)}
    {parseInt(page) * limit < data.posts.total ? <Link href={`/${parseInt(page) + 1}`}>Next Page</Link>: <div>end of results</div>}
    
    {parseInt(page) - 1 > 0 && <Link href={`/${parseInt(page) - 1}`}>Prev Page</Link>}
    </>
  );
}
}
return <div>dsadasd</div> //redirect to page 1
};

import auth from "../lib/auth";
import {compose} from '../lib/compose'

export const getServerSideProps = compose(auth)

export default Page;
