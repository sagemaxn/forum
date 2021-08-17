import { ObjectType, InputType, Field } from "type-graphql";
import { prop, getModelForClass } from "@typegoose/typegoose";

@ObjectType()
export class Post {
  @Field(() => String)
  @prop({ type: String, required: true, minlength: 3 })
  public username: string;

  @Field(() => String)
  @prop({ type: String, required: true })
  public content: string;

  @Field(() => String)
  @prop({ type: String, required: false})
  public comments: string

  @Field(() => Number)
  @prop({ type: String, required: false})
  public likes: number
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
  likes?: number
}

export const PostModel = getModelForClass(Post);