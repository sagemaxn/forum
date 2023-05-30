// ThreadResolver.ts
import {Arg, Int, Mutation, Query, Resolver} from "type-graphql";
import {Thread, ThreadInput, ThreadModel} from "./models/Thread";
import {UserModel} from "./models/User";
import { PostModel } from './models/Post'

@Resolver()
export class ThreadResolver {
    @Mutation(() => Thread)
    async createThread(
        @Arg("input") { title, username, firstPostContent }: ThreadInput,
        @Arg('avatar') avatar: string
    ): Promise<Thread> {
        let createdAt = new Date();

        const firstPost = await PostModel.create({
            username,
            avatar,
            content: firstPostContent,
            createdAt,
        });
        firstPost.save();
console.log(firstPost)
        const thread = await ThreadModel.create({
            title,
            username,
            posts: [firstPost.id],
            createdAt,
        });
        thread.save();

        const user = await UserModel.find({ username });
        user[0].threads.push(thread.id);
        user[0].posts.push(firstPost.id);
        user[0].save();

        return thread;
    }

    @Mutation(() => Boolean)
    async deleteThread(@Arg("threadID") threadID: string) {
        const deleted = await ThreadModel.deleteOne({ _id: threadID });
        return true;
    }

    @Query(() => [Thread])
    async threads(
        @Arg("limit", () => Int) limit: number,
        @Arg("offset", () => Int) offset: number
    ) {
        return ThreadModel.find()
            .sort({createdAt: -1})
            .skip(offset)
            .limit(limit);
    }

    @Query(() => [Thread])
    async userThreads(
        @Arg("username") username: string,
        @Arg("limit", () => Int) limit: number,
        @Arg("offset", () => Int) offset: number
    ) {
        return ThreadModel.find({username})
            .sort({createdAt: -1})
            .skip(offset)
            .limit(limit);
    }
}
