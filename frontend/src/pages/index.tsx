import { useQuery } from "@apollo/client";
import { Container } from "../components/Container";
import Layout from "../components/Layout";
import Post from '../components/Post'
import NewPostForm from '../components/NewPostForm'
import Navbar from '../components/Navbar'
import { usePostsQuery, PostsDocument } from "../generated/graphql";
import { FindUserDocument } from "../generated/graphql";

const Index = ({ decoded,  token }) => {
console.log(decoded)
  const { data, loading, error } = useQuery(PostsDocument)
 if (loading) return <Navbar user={decoded.user} avatar={decoded.avatar}/>
  return (
    <>
    <Navbar user={decoded.user} avatar={decoded.avatar}/>
    <NewPostForm user={decoded.user} avatar={decoded.avatar}/>
    {data.posts.map(post => <Post content={post.content} user={post.username} createdAt={post.createdAt} avatar={post.avatar} key={post._id} loggedUser={decoded.user} postID={post._id}></Post>)}
    </>
  );
};

import auth from "../lib/auth";
import {compose} from '../lib/compose'

export const getServerSideProps = compose(auth)

export default Index;
