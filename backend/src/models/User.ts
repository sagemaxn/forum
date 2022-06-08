import { ObjectType, InputType, Field } from "type-graphql";
import { prop, getModelForClass } from "@typegoose/typegoose";
import { Post } from './Post'

@ObjectType()
export class User {
  @Field(() => String)
  @prop({ type: String, required: true, minlength: 3 })
  public username: string;

  //@Field(() => String)
  @prop({ type: String, required: true })
  public password: string;

  @Field(() => String)
  @prop({ type: String, required: true })
  public picture: string

  @Field(() => [Post])
  @prop({ ref: () => Post})
  public posts: Post[];
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