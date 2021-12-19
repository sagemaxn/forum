import { useQuery } from "@apollo/client";
import { Container } from "../components/Container";
import Layout from "../components/Layout";
import Post from '../components/Post'
import { usePostsQuery, PostsDocument } from "../generated/graphql";
import { useFindUserMutation, FindUserDocument } from "../generated/graphql";

const Index = ({ auth,  token }) => {

  const { data, loading, error } = useQuery(PostsDocument)
 if (loading) return 'loading'
  return (
    <>
    {data.posts.map(post => {console.log(post._id) 
    return <Post content={post.content} user={post.username} createdAt={post.createdAt} key={post._id}></Post>})}
    </>
  );
};

import auth from "../lib/auth";
import {compose} from '../lib/compose'

export const getServerSideProps = compose(auth)

export default Index;
