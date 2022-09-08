import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import {
  useUserPostsQuery,
  UserPostsDocument,
} from "../../../generated/graphql";
import auth from "../../../lib/auth";
import { compose } from "../../../lib/compose";
import UserProfile from "../../../components/UserProfile";
import Post from "../../../components/Post";
import Navbar from "../../../components/Navbar";

const User = ({ decoded }) => {
  const router = useRouter();
  const { user } = router.query;
  const { page } = router.query;
  let offset = 1;
  const [userW, setUser] = useState("no user found");
  if (typeof user === "string" && typeof page === "string") {
    offset = (parseInt(page) - 1) * 5;
    const { data, loading, error } = useUserPostsQuery({
      variables: {
        username: user,
        offset: offset,
        limit: 5,
      },
    });
    if (userW !== user) {
      setUser(user);
    }

    if (loading) return <Navbar user={decoded.user} avatar={decoded.avatar} />;
    if (data) {
      console.log(data);
      return (
        <>
          <Navbar user={decoded.user} avatar={decoded.avatar} />
          {data.userPosts.data.map((post) => (
            <Post
              content={post.content}
              user={post.username}
              createdAt={post.createdAt}
              avatar={post.avatar}
              key={post._id}
              loggedUser={decoded.user}
              postID={post._id}
            ></Post>
          ))}
          {parseInt(page) * 5 < data.userPosts.total && (
            <Link href={`/user/${user}/${parseInt(page) + 1}`}>Next Page</Link>
          )}

          {parseInt(page) - 1 > 0 && (
            <Link href={`/user/${user}/${parseInt(page) - 1}`}>Prev Page</Link>
          )}
        </>
      );
    }
    return <div>dsadas</div>;
  }
};
export const getServerSideProps = compose(auth);

export default User;
