import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useFindUserMutation, FindUserDocument } from "../generated/graphql";
import { initializeApollo } from "../lib/apollo";
import UserProfile from '../components/UserProfile'

const User = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [user, setUser] = useState('no user found')
  const [checkUser, { data, loading, error }] = useFindUserMutation({
    variables: { username: user },
  });
  if(typeof slug === 'string'){
    if (user !== slug)
    setUser(slug)
  }
  checkUser()
  //console.log(user)
  if (loading) return 'loading'
  if(data){
      console.log(data)
      if (data.findUser !== 'no user found'){
      return <UserProfile user={data.findUser}/>
      }
      else return <div>404 no user found</div>
  }
  return <div>404 no user found</div>
};

import auth from "../lib/auth";
import { compose } from "../lib/compose";
import { useState } from "react";

export const getServerSideProps = compose(auth);

export default User;
