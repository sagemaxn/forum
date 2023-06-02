// ThreadResolver.ts
import {Arg, Int, Mutation, Query, Resolver} from "type-graphql";
import {Thread, ThreadInput, ThreadModel, Threads, ThreadWithPosts} from "./models/Thread";
import {UserModel} from "./models/User";
import {PostModel} from './models/Post'
import {mongoose} from "@typegoose/typegoose";

@Resolver()
export class ThreadResolver {
    @Mutation(() => Thread)
    async createThread(
        @Arg("input") { title, username, firstPostContent, avatar }: ThreadInput,
    ): Promise<Thread> {
        let createdAt = new Date();

        const thread = await ThreadModel.create({
            title,
            username,
            avatar,
            posts: [],
            createdAt,
        });
        await thread.save();

        const firstPost = await PostModel.create({
            username,
            avatar,
            content: firstPostContent,
            createdAt,
            thread_id: thread.id,
        });
        await firstPost.save();

        thread.posts.push(firstPost.id);
        await thread.save();

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

    @Query(() => Threads)
    async threads(
        @Arg("limit", () => Int) limit: number,
        @Arg("offset", () => Int) offset: number
    ) {
        const threads = await ThreadModel.aggregate([
            { $sort: { createdAt: -1 } },
            {
                $facet: {
                    count: [{ $count: "total" }],
                    data: [{ $skip: offset }, { $limit: limit }],
                },
            },
        ]);

        return {total: threads[0]?.count[0]?.total || 0, data: threads[0]?.data || []};
    }

    @Query(() => Threads)
    async userThreads(
        @Arg("username") username: string,
        @Arg("limit", () => Int) limit: number,
        @Arg("offset", () => Int) offset: number
    ) {
        const threads = await ThreadModel.aggregate([
            { $match: { username: username } },
            { $sort: { createdAt: -1 } },
            {
                $facet: {
                    count: [{ $count: "total" }],
                    data: [{ $skip: offset }, { $limit: limit }],
                },
            },
        ]);

        return { total: threads[0]?.count[0]?.total || 0, data: threads[0]?.data || [] };
    }

    @Query(() => ThreadWithPosts)
    async threadWithPosts(
        @Arg("id") id: string,
        @Arg("limit", () => Int, { defaultValue: 5 }) limit: number,
        @Arg("offset", () => Int, { defaultValue: 0 }) offset: number
    ) {
        const thread = await ThreadModel.findById(id);

        const posts = await PostModel.aggregate([
            { $match: { thread_id: new mongoose.Types.ObjectId(id) } },
            { $sort: { createdAt: -1 } },
            {
                $facet: {
                    count: [{ $count: "total" }],
                    data: [{ $skip: offset }, { $limit: limit }],
                },
            },
        ]);

        return { thread, total: posts[0]?.count[0]?.total || 0, data: posts[0]?.data || [] };
    }


}
