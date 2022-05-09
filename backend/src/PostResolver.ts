import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { Post, PostModel, PostInput } from "./models/Post";
import { CommentInput } from "./models/Comment";
import { UserModel } from "./models/User";
//import PostInput

@Resolver()
export class PostResolver {
  @Mutation(() => Post)
  async createPost(
    @Arg("input") { username, content }: PostInput
  ): Promise<Post> {
    let comments = "";
    let likes = "";

    let createdAt = new Date();

    const post = await PostModel.create({
      username,
      content,
      comments,
      likes,
      createdAt,
    });
    post.save();

    const user = await UserModel.find({ username: username });
    user[0].posts.push(post.id);
    user[0].save();

    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg("postID") postID: string) {
    const deleted = await PostModel.deleteOne({ _id: postID });
    return true;
  }

  @Mutation(() => Post)
  async createComment(
    @Arg("comment") { comment, userID }: CommentInput,
    @Arg("postID") postID: string
  ): Promise<Post> {
    const update = { $push: { comments: { comment, username: userID } } };
    // PostModel.updateOne({_id: postID}, update
    // try{
    // post.save()
    // }
    // catch(err){
    //   console.log(err)
    // }
    const newPost = await PostModel.findByIdAndUpdate(postID, update, {
      new: true,
    });
    return newPost;
  }
  @Query(() => [Post])
<<<<<<< HEAD
  async posts() {
    const posts = await PostModel.find().sort({ createdAt: -1 });
=======
  async posts(){
    const posts = await PostModel.find().sort({createdAt:-1})
    console.log(posts)
    
    return posts
  }
>>>>>>> 4be8c9a0708d64ceb126529693704829ee6b918a

    return posts;
  }
}
