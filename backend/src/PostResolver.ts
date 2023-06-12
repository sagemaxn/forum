import {Arg, Int, Mutation, Query, Resolver} from "type-graphql";
import {Post, PostInput, PostModel, Posts} from "./models/Post";
import {UserModel} from "./models/User";
import {ThreadModel} from "./models/Thread";

@Resolver()
export class PostResolver {
  @Mutation(() => Post)
  async createPost(
      @Arg("input") {username, content, thread_id}: PostInput
  ): Promise<Post> {
    const user = await UserModel.findOne({username});
    if (!user) {
      throw new Error('User not found');
    }

    let createdAt = new Date();
    const post = await PostModel.create({
      user: user,
      content,
      thread: thread_id,
      createdAt,
    });
    await post.save();

    user.posts.push(post.id);
    await user.save();

    const thread = await ThreadModel.findById(thread_id);
    thread.posts.push(post.id);
    await thread.save();

    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg("postID") postID: string) {
    const deleted = await PostModel.deleteOne({_id: postID});
    return true;
  }

  @Query(() => Posts)
  async posts(
      @Arg("limit", () => Int) limit: number,
      @Arg("offset", () => Int) offset: number
  ) {
    const posts = await PostModel.find()
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit)
        .populate({
          path: 'user',
          select: 'username avatar'
        });

    const total = await PostModel.countDocuments();

    return { total, data: posts };
  }

  @Query(() => Posts)
  async userPosts(
      @Arg("username") username: string,
      @Arg("limit", () => Int) limit: number,
      @Arg("offset", () => Int) offset: number
  ) {
    const user = await UserModel.findOne({ username });

    if (!user) {
      throw new Error("User not found");
    }

    const posts = await PostModel.find({ user: user._id })
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit)
        .populate({
          path: 'user',
          select: 'username avatar'
        });

    const total = posts.length

    return { total, data: posts };
  }

}