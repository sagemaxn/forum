import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Post from "../../../components/Post";
import NewPostForm from "../../../components/NewPostForm";
import Navbar from "../../../components/Navbar";
import {PostsList} from "../../../components/PostsList"
import { ThreadWithPostsDocument} from "../../../generated/graphql";

const Page = ({ decoded }) => {
  const router = useRouter();
  const { thread, page } = router.query;
  let offset = 1;
  if (typeof page === "string") {
    if (parseInt(page, 10)) {
      offset = (parseInt(page) - 1) * 5;
      const { data, loading, error, fetchMore } = useQuery(ThreadWithPostsDocument, {
        variables: {
          offset: offset,
          limit: 5, threadWithPostsId: thread
        },
      });
      if (loading)return <Loading/>
            return (
                <>
                    <Navbar user={decoded.user} />
                    <NewPostForm user={decoded.user} thread_id={thread}/>
                    <PostsList data={data} user={decoded.user} page={page}/>
                </>
            );
    }
  }
  return <div>dsadasd</div>; //redirect to page 1
};

import auth from "../../../lib/auth";
import { compose } from "../../../lib/compose";
import {Loading} from "../../../components/Loading";

export const getServerSideProps = compose(auth);

export default Page;
