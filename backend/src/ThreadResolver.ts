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
        @Arg("input") { title, username, firstPostContent }: ThreadInput,
    ): Promise<Thread> {
        let createdAt = new Date();

        const user = await UserModel.findOne({ username });
        if (!user) {
            throw new Error("User not found");
        }

        const thread = await ThreadModel.create({
            title,
            user: user,
            posts: [],
            createdAt,
        });
        await thread.save();

        const firstPost = await PostModel.create({
            user,
            content: firstPostContent,
            createdAt,
            thread_id: thread.id,
        });
        await firstPost.save();

        thread.posts.push(firstPost.id);
        await thread.save();

        user.threads.push(thread.id);
        user.posts.push(firstPost.id);
        await user.save();

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
        const total = await ThreadModel.countDocuments();

        const threads = await ThreadModel.find()
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(limit)
            .populate({
                path: 'user',
                select: 'username avatar'
            });

        console.log({ total: total, threads: threads })

        return { total, data: threads };
    }

    @Query(() => Threads)
    async userThreads(
        @Arg("username") username: string,
        @Arg("limit", () => Int) limit: number,
        @Arg("offset", () => Int) offset: number
    ) {
        const user = await UserModel.findOne({ username });

        if (!user) {
            throw new Error("User not found");
        }

        const threads = await ThreadModel.find({ user: user._id })
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(limit)
            .populate({
                path: 'user',
                select: 'avatar'
            });

        const total = threads.length

        return { total, data: threads };
    }

    @Query(() => ThreadWithPosts)
    async threadWithPosts(
        @Arg("id") id: string,
        @Arg("limit", () => Int, { defaultValue: 5 }) limit: number,
        @Arg("offset", () => Int, { defaultValue: 0 }) offset: number
    ) {
        const thread = await ThreadModel.findById(id)
            .populate({
                path: 'posts',
                populate: {
                    path: 'user',
                    select: 'avatar'
                },
                options: {
                    sort: { createdAt: -1 },
                    skip: offset,
                    limit: limit
                }
            })
            .populate({
                path: 'user',
                select: 'username avatar'
            });

        const total = thread.posts.length

        console.log(JSON.stringify({ thread, total }));

        return { thread, total };
    }



}
