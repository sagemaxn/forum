import { useQuery } from "@apollo/client";
import { Container } from "../components/Container";
import Layout from "../components/Layout";
import Post from '../components/Post'
import NewPostForm from '../components/NewPostForm'
import { usePostsQuery, PostsDocument } from "../generated/graphql";
import { useFindUserMutation, FindUserDocument } from "../generated/graphql";

const Index = ({ decoded,  token }) => {

  const { data, loading, error } = useQuery(PostsDocument)
  if(data){console.log(data.username)}
 if (loading) return 'loading'
  return (
    <>
    <NewPostForm user={decoded.user}/>
    {data.posts.map(post => {console.log(post._id) 
    return <Post content={post.content} user={post.username} createdAt={post.createdAt} key={post._id} loggedUser={decoded.user} postID={post._id}></Post>})}
    </>
  );
};

import auth from "../lib/auth";
import {compose} from '../lib/compose'

export const getServerSideProps = compose(auth)

export default Index;
