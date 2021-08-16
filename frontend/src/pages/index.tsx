import { Container } from "../components/Container";
import Layout from "../components/layout";

const Index = ({ auth, data, token }) => {
 
  return (
        <Layout>
        <Container>posts</Container>
        </Layout>
  );
};

import auth from "../lib/auth";
import {compose} from '../lib/compose'

export const getServerSideProps = compose(auth)

export default Index;
