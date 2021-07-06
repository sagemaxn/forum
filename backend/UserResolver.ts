import { Resolver, Query, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";
import {hash, compare} from "bcryptjs";
import { sign } from "jsonwebtoken";

import { User, UserModel, UserInput, LoginToken } from "./models/User";
import { resolve } from "path";

@Resolver()
export class UserResolver {
  @Query(() => String)
  query() {
    return {bean: "dasda"}
  }

  @Query(() => String)
  @UseMiddleware(({context}, next) => {
    //context.req.headers['auth']
    if (context.payload){
     return context.payload.userID
    }
    else{
      console.log('user not authorized')
    }
    return next()
  })
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
