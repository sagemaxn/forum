import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

import { User, UserInput, LoginToken } from "./models/User";
import { getModelForClass } from "@typegoose/typegoose";

const UserModel = getModelForClass(User);

@Resolver()
export class UserResolver {
  @Query(() => String)
  query() {
    return "yo";
  }
  @Mutation(() => User)
  async createUser(
    @Arg("input") { username, password }: UserInput
  ): Promise<User> {
    //console.log(input)
    password = await bcrypt.hash(password, 12);
    const user = await UserModel.create({ username, password });
    user.save();
    // user.password = null
    return user;
  }
  @Mutation(() => LoginToken)
  async login(
    @Arg("input") { username, password }: UserInput,
    @Ctx() { req, res }
  ): Promise<LoginToken> {
    const user = await UserModel.find({ username: username });
    const passwordCorrect = await bcrypt.compare(password, user[0].password);
    if (user && passwordCorrect) {
      return {
        token: sign({ userID: user._id }, process.env.NEW_JWT_SECRET, { expiresIn: "60m" }),
      };
    } else {
      console.log("invalid");
      return { token: "ddd" };
    }
  }
}
