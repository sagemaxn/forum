import { useState } from "react";
import { Text } from '@chakra-ui/react'
import { useRouter } from "next/router";
import Link from "next/link";

import {
  useUserActivityQuery,
  useUserPostsQuery,
} from "../../../generated/graphql";
import auth from "../../../lib/auth";
import { compose } from "../../../lib/compose";
import Post from "../../../components/Post";
import Navbar from "../../../components/Navbar";
import {PostsList} from "../../../components/PostsList";
import UserProfile from "../../../components/UserProfile";

const User = ({ decoded }) => {
  const router = useRouter();
  const { user } = router.query;
  const { page } = router.query;
  let offset = 1;
  if (typeof user === "string" && typeof page === "string") {
    offset = (parseInt(page) - 1) * 5;
    const { data, loading, error } = useUserActivityQuery({
      variables: {
        username: user,
        offset: offset,
        limit: 5,
      },
    });

    if (loading) return <Navbar user={decoded.user} />;
    if (data) {
      console.log(`data from UserActivityQuery: ${JSON.stringify(data.userActivity.data, null, "\t")}`);
      return (
        <>
          <Navbar user={decoded.user} />
          <UserProfile user={user} data={data} page={page} loggedUser={decoded.user}/>

        </>
      );
    }
  }
};
export const getServerSideProps = compose(auth);

export default User;
