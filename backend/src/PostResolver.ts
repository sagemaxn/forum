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
    let comments = ''
    let likes = ''

    let createdAt = new Date()
    
    const post = await PostModel.create({ username, content, comments, likes, createdAt });
    post.save();

    const user = await UserModel.find({username: username})
    console.log(user)
    user[0].posts.push(post.id)
    user[0].save()

    console.log(post.id)
    console.log(post._id)

    return post;
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
    console.log(newPost);
    return newPost;
  }
  @Query(() => [Post])
  async posts(){
    const posts = await PostModel.find()
    console.log(posts)
    
    return posts
  }

}
