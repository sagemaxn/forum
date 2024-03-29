import { hash } from 'bcryptjs';
import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';

import { PostModel, ThreadModel, User, UserActivity, UserInput, UserModel } from './models';

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async createUser(
      @Arg("input") { username, password }: UserInput
  ): Promise<User> {
    const existingUser = await UserModel.findOne({username: username});
    if(existingUser){
      throw new Error('Username already taken');
    }
    password = await hash(password, 12);
    const user = await UserModel.create({
      username,
      password,
      avatar: "default",
    });
    await user.save();
    return user;
  }
  @Mutation(() => User)
  async changeAvatar(
      @Arg("avatar") avatar: string,
      @Arg("username") username: string
  ) {
    try {
      let user = await UserModel.findOneAndUpdate({ username }, { avatar }, { new: true });
      let posts = await PostModel.updateMany({ username }, { avatar });
      let threads = await ThreadModel.updateMany({ username }, {avatar})
      return user;
    } catch (err) {
      console.error(err);
    }
  }
  @Query(() => [User])
  async users() {
    return UserModel.find();
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
        })
        .populate({
          path: 'posts'
        })

    let posts =  await PostModel.find({ user: user._id })
        .populate({
          path: 'user',
          select: 'username avatar',
        })
        .populate({
          path: 'thread', options: {limit: 1}
        })

    let filteredCount = 0;

    posts = posts.filter(post => {
      for (let i = 0; i < threads.length; i++) {
        if (threads[i].posts[0]._id.toString() === post._id.toString()) {
          filteredCount++;
          return false;
        }
      }
      return true;
    });
    const threadsTotal = await ThreadModel.countDocuments({user: user._id})
    const postsTotal = await PostModel.countDocuments({user: user._id})


    const correctedPostsTotal = postsTotal - filteredCount;

    const total = threadsTotal + correctedPostsTotal;

    const activities = (posts as Array<any>).concat(threads as Array<any>);

    activities.sort((a, b) => b.createdAt - a.createdAt)
    console.log(activities)


    return { total, data: activities.slice(offset, offset + limit) };
  }
}

