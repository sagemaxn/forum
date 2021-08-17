import { Resolver, Query, Mutation, Arg, Ctx} from 'type-graphql'
import { Post, PostModel, PostInput } from './models/Post'
//import PostInput

@Resolver()
export class PostResolver {
  @Mutation(() => Post)
	 async createPost(
    @Arg("input") { username, content, comments, likes }: PostInput
  ): Promise<Post> {
	 	if(!likes){
	 		likes = 0
	 	}
     const post = await PostModel.create({ username, content, comments, likes });
     post.save();
     
     return post;
  }
}

