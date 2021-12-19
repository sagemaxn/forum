import { ObjectType, InputType, Field, Int, ID } from "type-graphql";
import { prop, getModelForClass, mongoose } from "@typegoose/typegoose";
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

  @Field(() => Date)
  @prop( {type: Date, required: true })
  public createdAt: Date

  @Field(() => String)
  @prop()
  public _id: mongoose.Types.ObjectId

  // @Field(() => [Comment])
  // @prop()
  // public comments: [Comment]

}



@InputType()
export class PostInput {
  @Field()
  username: string;

  @Field()
  content: string;

  @Field()
  @prop({ type: String, required: false })
  comments?: string

  @Field()
  @prop({ type: String, required: false })
  likes?: string
}

export const PostModel = getModelForClass(Post);