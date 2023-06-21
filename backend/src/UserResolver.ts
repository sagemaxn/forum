import {Arg, Int, Mutation, Query, Resolver} from "type-graphql";
import { hash} from "bcryptjs";

import {User, UserInput, UserModel,} from "./models";
import { UserActivity} from './models'

import {PostModel} from "./models";
import {ThreadModel, Threads} from "./models";

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
      let threads = await ThreadModel.updateMany({ username }, {avatar})
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

  @Query(() => UserActivity)
  async userActivity(
      @Arg("username") username: string,
      @Arg("limit", () => Int) limit: number,
      @Arg("offset", () => Int) offset: number
  ) {
    const user = await UserModel.findOne({ username });

    if (!user) {
      throw new Error("User not found");
    }

    const threads = await ThreadModel.find({ user: user._id })
        .populate({
          path: 'user',
          select: 'username avatar'
        });

    const posts =  await PostModel.find({ user: user._id })
        .populate({
          path: 'user',
          select: 'username avatar',
        })
        .populate({
        path: 'thread',
          select: 'title'
    })
    const activities = (posts as Array<any>).concat(threads as Array<any>);

    activities.sort((a, b) => b.createdAt - a.createdAt)
    console.log(activities)

    const threadsTotal = await ThreadModel.countDocuments()
    const postsTotal = await PostModel.countDocuments()
    const total = threadsTotal + postsTotal


    return { total, data: activities.slice(offset, offset + limit) };
  }
}

