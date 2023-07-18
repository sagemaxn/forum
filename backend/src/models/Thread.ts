import {ObjectType, InputType, Field, ID} from "type-graphql";
import { prop, getModelForClass, mongoose, Ref } from "@typegoose/typegoose";
import { Post } from '.';
import { User } from '.';

@ObjectType()
export class Thread {
    @Field(() => String)
    @prop({ type: String, required: true })
    public title: string;

    @Field(() => User)
    @prop({ ref: () => User})
    public user: Ref<User>;

    @Field(() => [Post], {nullable: true})
    @prop({ ref: () => Post, default: [] })
    public posts?: Ref<Post>[];

    @Field(() => Date)
    @prop( {type: Date, required: true })
    public createdAt: Date;

    @Field(() => ID)
    _id: mongoose.Types.ObjectId
}

@InputType()
export class ThreadInput {
    @Field(() => String)
    @prop({type: String,required: true})
    title: string;

    @Field(() => String)
    @prop({type: String, required: true})
    firstPostContent: string

    @Field(() => String)
    @prop({type: String,required: true})
    username: string;

    @Field(() => String)
    @prop({type: String, required: true})
    avatar: string
}

@ObjectType()
export class Threads {
    @Field(() => Number)
    total: number

    @Field(() => [Thread])
    data: Thread[]
}

@ObjectType()
export class ThreadWithPosts {
    @Field(() => Thread)
    data: Thread

    @Field(() => Number)
    total: number

}

export const ThreadModel = getModelForClass(Thread);
