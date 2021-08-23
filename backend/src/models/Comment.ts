import { ObjectType, InputType, Field, Int, ID } from "type-graphql";
import { prop, getModelForClass, Prop } from "@typegoose/typegoose";
import { User } from './User'

@ObjectType()
export class Comment{
    @Field(() => User)
    @prop()
    public username: string

    @Field(() => String)
    @prop()
    public comment: string
}

@InputType()
export class CommentInput{
    @Field()
    comment: string

    @Field()
    userID: string

}

export const CommentModel = getModelForClass(Comment);