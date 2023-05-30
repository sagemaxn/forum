import {Arg, Mutation, Query, Resolver} from "type-graphql";
import { hash} from "bcryptjs";

import { User, UserInput, UserModel,} from "./models/User";

import {PostModel} from "./models/Post";

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async createUser(
      @Arg("input") { username, password }: UserInput
  ): Promise<User> {
    password = await hash(password, 12);
    const user = await UserModel.create({
      username,
      password,
      avatar:
          "default",
    });
    user.save();
    // user.password = null
    return user;
  }
  @Mutation(() => User)
  async changeAvatar(
    @Arg("avatar") avatar: string,
    @Arg("username") username: string
  ) {
    try {
      let user = await UserModel.findOneAndUpdate({ username }, { avatar });
      let posts = await PostModel.updateMany({ username }, { avatar });
      return user;
    } catch (err) {
      console.error(err);
    }
  }
  @Query(() => [User])
  async users() {
    const users = await UserModel.find();
    console.log(users);
    return users;
  }
  @Query(() => User, { nullable: true })
  async currentUser(@Arg('username') username: string): Promise<User | null>{
    return UserModel.findOne({username});
  }
}
