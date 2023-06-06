import {Arg, Int, Mutation, Query, Resolver} from "type-graphql";
import {Post, PostInput, PostModel, Posts} from "./models/Post";
import {UserModel} from "./models/User";
import {ThreadModel} from "./models/Thread";

@Resolver()
export class PostResolver {
  @Mutation(() => Post)
  async createPost(
      @Arg("input") { username, content, thread_id }: PostInput
  ): Promise<Post> {
    const user = await UserModel.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }

    let createdAt = new Date();
    const post = await PostModel.create({
      user,
      content,
      thread_id,
      createdAt,
    });
    await post.save();

    user.posts.push(post.id);
    user.save();

    const thread = await ThreadModel.findById(thread_id);
    thread.posts.push(post.id);
    thread.save();

    return post;
  }


  @Mutation(() => Boolean)
  async deletePost(@Arg("postID") postID: string) {
    const deleted = await PostModel.deleteOne({ _id: postID });
    return true;
  }

  @Query(() => Posts)
  async posts(
    @Arg("limit", () => Int) limit: number,
    @Arg("offset", () => Int) offset: number
  ) {
    const posts = await PostModel.aggregate([
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          count: [{ $count: "total" }],
          data: [{ $skip: offset }, { $limit: limit }],
        },
      },
    ]);

    return {total: posts[0].count[0].total, data: posts[0].data};
  }

  @Query(() => Posts)
  async userPosts(
    @Arg("username") username: string,
    @Arg("limit", () => Int) limit: number,
    @Arg("offset", () => Int) offset: number
  ) {
    const posts = await PostModel.aggregate([
      { $match: { username }},
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          count: [{ $count: "total" }],
          data: [{ $skip: offset }, { $limit: limit }],
        },
      },
    ]);

    const obj = { total: posts[0].count[0].total, data: posts[0].data };
    console.log(obj);

    return obj;
  }
}
