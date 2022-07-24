import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FindUserPostsDocument } from "../../generated/graphql";
import { useQuery } from "@apollo/client";
import Link from 'next/link'
import Post from '../../components/Post'
import auth from "../../lib/auth";
import { compose } from "../../lib/compose";
// import UserProfile from '../../components/UserProfile'
import Navbar from "../../components/Navbar";

const User = ({ decoded }) => {
  const router = useRouter();
  const { slug } = router.query;
  let user = slug[0]
  let page = slug[1]
  console.log(slug)
  let offset = 5
  let limit = 5
  if( typeof(page) === 'string'){
    if(parseInt(page, 10) ){
      offset = (parseInt(page) -1) * limit
  const { data, loading, error } = useQuery(FindUserPostsDocument, {
    variables: { username: user, limit, offset },
  });
 
  if (loading) return <Navbar user={decoded.user} avatar={decoded.avatar}/>
  console.log(data)
   return (
     <>
     <Navbar user={decoded.user} avatar={decoded.avatar}/>
     {data.findUserPosts.data.map(post => <Post content={post.content} user={post.username} createdAt={post.createdAt} avatar={post.avatar} key={post._id} loggedUser={decoded.user} postID={post._id}></Post>)}
     {parseInt(page) * limit < data.findUserPosts.total ? <Link href={`/user/${user}/${parseInt(page) + 1}`}>Next Page</Link>: <div>end of results</div>}
     
     {parseInt(page) - 1 > 0 && <Link href={`/user/${user}/${parseInt(page) - 1}`}>Prev Page</Link>}
     </>
   );
 }
 }
 return <div>dsadasd</div> //redirect to page 1
 };
 

export const getServerSideProps = compose(auth);

export default User;
