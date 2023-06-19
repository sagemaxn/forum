import {ObjectType, InputType, Field, ID, createUnionType} from "type-graphql";
import {prop, getModelForClass, Ref, mongoose} from "@typegoose/typegoose";
import { Post, PostModel, PostInput } from '.';
import { Thread, ThreadModel, ThreadInput, Threads, ThreadWithPosts } from '.';

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

export const PostOrThread = createUnionType({
  name: "PostOrThread",
  types: () => [Post, Thread],
  resolveType: value => {
    if ('content' in value) {
      return Post; // it's a Post type
    }
    if ('title' in value) {
      return Thread; // it's a Thread type
    }
    return undefined; // or throw an error
  }
});

@ObjectType()
export class UserActivity {
  @Field(() => Number)
  total: number;

  @Field(() => [PostOrThread])
  data: Array<typeof PostOrThread>;
}
export const UserModel = getModelForClass(User);