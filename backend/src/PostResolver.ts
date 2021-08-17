import { Resolver, Query, Mutation, Arg, Ctx} from 'type-graphql'
import { Post, PostModel } from './models/Post'
//import PostInput

@Resolver
export class PostResolver {
	 async createPost(
    @Arg("input") { username, content, comments, likes }: PostInput
  ): Promise<Post> {
	 	if(!likes){
	 		likes = 0
	 	}
    //console.log(input)
    //const user = await
    // user.password = null
    return post;
  }
}

