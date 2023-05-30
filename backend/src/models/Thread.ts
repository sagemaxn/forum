// Thread.ts
import { ObjectType, InputType, Field, ID } from "type-graphql";
import { prop, getModelForClass, mongoose } from "@typegoose/typegoose";
import { Post } from './Post'

@ObjectType()
export class Thread {
    @Field(() => String)
    @prop({ type: String, required: true })
    public title: string;

    @Field(() => String)
    @prop({ type: String, required: true })
    public username: string;

    @Field(() => [Post])
    @prop({ ref: () => Post})
    public posts: Post[];

    @Field(() => Date)
    @prop( {type: Date, required: true })
    public createdAt: Date

    @Field(() => String)
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
}

export const ThreadModel = getModelForClass(Thread);
