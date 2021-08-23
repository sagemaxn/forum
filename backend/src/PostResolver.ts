import { Resolver, Query, Mutation, Arg, Ctx} from 'type-graphql'
import { Post, PostModel, PostInput } from './models/Post'
import {CommentInput} from './models/Comment'
//import PostInput

@Resolver()
export class PostResolver {
  @Mutation(() => Post)
	 async createPost(
    @Arg("input") { username, content, comments, likes }: PostInput
  ): Promise<Post> {
     const post = await PostModel.create({ username, content, comments, likes });
     post.save();
     
     return post;
  } 
    @Mutation(() => Post)
    async createComment(
      @Arg('comment') {comment, userID}: CommentInput,
      @Arg('postID') postID: string,
    ): Promise<Post> {
     const update =  {$push: {"comments": {comment, username: userID}}}
      // PostModel.updateOne({_id: postID}, update)
     
   
      // try{
      // post.save()
      // }
      // catch(err){
      //   console.log(err)
      // }
    const newPost = await PostModel.findByIdAndUpdate(postID, update, {new: true})
    console.log(newPost)
      return newPost
      
    }


  
//     @Mutation(() => Post)
//     async likePost(
//       @Arg("selection") ID: string,
//       @Arg("user") user: string
//     ): Promise<Post> {
//       
//     } 
}
 
