import { ObjectType, InputType, Field } from "type-graphql";
import { prop, getModelForClass } from "@typegoose/typegoose";

@ObjectType()
export class User {
  @Field(() => String)
  @prop({ type: String, required: true, minlength: 3 })
  public username: string;

  //@Field(() => String)
  @prop({ type: String, required: true })
  public password: string;
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

export const UserModel = getModelForClass(User);