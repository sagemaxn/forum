import { Resolver, Query, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";
import {hash, compare} from "bcryptjs";
import { sign } from "jsonwebtoken";
import {verify} from 'jsonwebtoken'
import {JwtPayload} from 'jsonwebtoken'

import { User, UserModel, UserInput, LoginToken, RefreshToken } from "./models/User";
import { resolve } from "path";
//import { Token } from "graphql";
//import e = require("express");
import { parseType } from "graphql";

import { get } from 'lodash'

@Resolver()
export class UserResolver {
  @Query(() => User)
  query() {
    return {username: "d", password: "password"}
  }
  @Query(() => RefreshToken)
  checkAuth(
    @Ctx() { req },
    @Arg('cookie') cookie: string
  ): RefreshToken{
    console.log(cookie)
   // console.log(get(cookie)
   //  //const jid = get(req, 'cookies.jid')
   //  if(jid){
     
      //add arg, 
 
    //   //done next
    //   //multiple cookies?
    //   //console.log(req.headers.authorization)
    // return {refreshToken: jid}
   
      
    //  }
    if(cookie!== ''){
      console.log('it is not empty')
      console.log(cookie)
      //console.log(verify(cookie, process.env.JWT_REFRESH))

      return {refreshToken: 'token!'}
    }

     else return {refreshToken: 'no token'}
   
  }

  @Query(() => String)
  // @UseMiddleware(async ({context}, next) => {
  //   //context.req.headers['auth']
  //   if (context.req.headers.cookie){
  //     console.log('headers')
  //    return {token: context.req.headers.cookie}
  //   }
  //   else{
  //     console.log('user not authorized')
  //   }
  //   return next()
  // })
  bye() {
    return "bye"
  }

  @Mutation(() => String)
  ctx(
    @Ctx() { res }
    ): string {
     //console.log(res)
     //console.log(res.cookie)
     return "test"
  }

  @Mutation(() => User)
  async createUser(
    @Arg("input") { username, password }: UserInput
  ): Promise<User> {
    //console.log(input)
    password = await hash(password, 12);
    const user = await UserModel.create({ username, password });
    user.save();
    // user.password = null
    return user;
  }
  @Query(()=> LoginToken)
  async cookie(
    @Ctx() {res, req}
  ): Promise<LoginToken> {
    res.cookie('yum', sign({ payload: 'this is a coookie' }, process.env.JWT_REFRESH, {
      expiresIn: "5d"
  }),
  {
      httpOnly: true,
  })
  return {token: JSON.stringify(get(req, 'cookies.jid') || 'no')}
  }

  @Mutation(() => LoginToken)
  async login(
    @Arg("input") { username, password }: UserInput,
    @Ctx() { res }
  ): Promise<LoginToken> {
    //console.log(con)
    const user = await UserModel.find({ username: username });
    console.log(user)
    //console.log(username, user[0].password, password, user.password)
    const passwordCorrect = await compare(password, user[0].password);
    //return{token: "dsaddsds"}
    //console.log(res)
    if (user && passwordCorrect) {
      console.log('should wokr')
        res.cookie('jid',
                    sign({ userID: user[0]._id, test: "test", }, process.env.JWT_REFRESH, {
                        expiresIn: "5d"
                    }),
                    {
                        httpOnly: true,
                    })

      return {
        token: sign({ userID: user[0]._id, test: "test" }, process.env.JWT_SECRET, { expiresIn: "60m" }),
      };
    } else {
      //console.log("invalid");
      return { token: "ddd" };
    }
  }
}
