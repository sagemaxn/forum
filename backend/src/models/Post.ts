import { ObjectType, InputType, Field, Int, ID } from "type-graphql";
import { prop, getModelForClass } from "@typegoose/typegoose";
import { User } from './User'
import { Comment } from './Comment'

@ObjectType()
export class Post {
  @Field(() => String)
  @prop({ type: String, required: true, minlength: 3 })
  public username: string;

  @Field(() => String)
  @prop({ type: String, required: true })
  public content: string;

  // @Field(() => String)
  // @prop({ type: String, required: false})
  @Field(() => [Comment])
  @prop()
  public comments: [Comment]

  @Field(() => [ID])
  @prop({ ref: User })
  public likes: [any]
}



@InputType()
export class PostInput {
  @Field()
  username: string;

  @Field()
  content: string;

  @Field()
  comments?: string

  @Field()
  likes?: string
}

export const PostModel = getModelForClass(Post);