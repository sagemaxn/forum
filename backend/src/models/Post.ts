import { ObjectType, InputType, Field, Int, ID } from "type-graphql";
import { prop, getModelForClass, mongoose, Ref } from "@typegoose/typegoose";
//import { User } from './User'
import {User} from "./User";

@ObjectType()
export class Posts {
  @Field(() => Number)
  total: number

  @Field(() => [Post])
  data: Post[]
}

@ObjectType()
export class Post {
  @Field(() => ID)
  _id: mongoose.Types.ObjectId

  @Field(() => String)
  @prop({ type: String, required: true })
  public content: string;

  @Field(() => Date)
  @prop( {type: Date, required: true })
  public createdAt: Date;

  @Field(() => User)
  @prop({ ref: 'User' })
  public user: Ref<User>;


}

@InputType()
export class PostInput {
  @Field(() => String)
  @prop({type: String,required: true})
  username: string;

  @Field(() => String)
  @prop({type: String,required: true})
  content: string;

  @Field(() => ID)
  @prop({type: String, required: true})
  thread_id: string

}

export const PostModel = getModelForClass(Post);