import { useQuery } from "@apollo/client";
import { Container } from "../components/Container";
import Layout from "../components/layout";
import { usePostsQuery, PostsDocument } from "../generated/graphql";
import { useFindUserMutation, FindUserDocument } from "../generated/graphql";

const Index = ({ auth,  token }) => {

  const { data, loading, error } = useQuery(PostsDocument)
 if (loading) return 'loading'
  return (

  <Container>{JSON.stringify(data)}</Container>
  
  );
};

import auth from "../lib/auth";
import {compose} from '../lib/compose'

export const getServerSideProps = compose(auth)

export default Index;
