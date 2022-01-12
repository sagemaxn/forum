import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useFindUserQuery, FindUserDocument } from "../generated/graphql";
import { initializeApollo } from "../lib/apollo";
import auth from "../lib/auth";
import { compose } from "../lib/compose";
import UserProfile from '../components/UserProfile'
import Navbar from "../components/Navbar";

const User = ({ decoded }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [user, setUser] = useState('no user found')
  const { data, loading, error } = useFindUserQuery({
    variables: { username: user },
  });
  if(typeof slug === 'string'){
    if (user !== slug)
    setUser(slug)
  }

  console.log(data)
  if (loading) return <Navbar user={decoded.user}/>
  if(data){
      if (data.findUser.posts[0].username !== 'no user found'){
      return <> <Navbar user={decoded.user}/><UserProfile user={data.findUser}/> </>
      }
      else return <div>404 no user found</div>
  }
  return <div>404 no user found</div>
};

export const getServerSideProps = compose(auth);

export default User;
