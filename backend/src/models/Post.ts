import { ObjectType, InputType, Field, Int, ID } from "type-graphql";
import { prop, getModelForClass, mongoose } from "@typegoose/typegoose";
//import { User } from './User'
import { Comment } from './Comment'

@ObjectType()
export class Posts {
  @Field(() => Number)
  total: number

  @Field(() => [Post])
  data: Post[]
}

@ObjectType()
export class Post {
  @Field(() => String)
  @prop({ type: String, required: true })
  public username: string

  @Field(() => String)
  @prop({ type: String, required: true })
  public avatar: string

  @Field(() => String)
  @prop({ type: String, required: true })
  public content: string;

  @Field(() => Date)
  @prop( {type: Date, required: true })
  public createdAt: Date

  @Field(() => ID)
  @prop({ type: mongoose.Types.ObjectId, required: true })
  public thread_id: mongoose.Types.ObjectId

  @Field(() => String)
  _id: mongoose.Types.ObjectId

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