import {ObjectType, InputType, Field, ID} from "type-graphql";
import {prop, getModelForClass, Ref, mongoose} from "@typegoose/typegoose";
import { Post } from './Post'
import { Thread } from './Thread'

@ObjectType()
export class User {
  @Field(() => String)
  @prop({ type: String, required: true, minlength: 3 })
  public username: string;

  @prop({ type: String, required: true })
  password: string;

  @Field(() => String)
  @prop({ type: String, required: true })
  public avatar: string;

  @Field(() => [Post])
  @prop({ ref: () => Post, default: [] })
  posts: Ref<Post>[];

  @Field(() => String, {nullable: true})
  @prop({ ref: 'Thread', default: [] })
  public threads?: Ref<Thread>[];

  @Field(() => ID)
  _id: mongoose.Types.ObjectId
}

@ObjectType()
export class LoginToken {
  @Field(() => String)
  token: string;
}

@InputType()
export class UserInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@InputType()
export class UsernameInput {
  
}

@ObjectType()
export class RefreshToken {
  @Field()
  refreshToken: string
}

export const UserModel = getModelForClass(User);