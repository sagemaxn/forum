// ThreadResolver.ts
import {Arg, Int, Mutation, Query, Resolver} from "type-graphql";
import {Thread, ThreadInput, ThreadModel, Threads, ThreadWithPosts} from "./models";
import {UserModel} from "./models";
import {PostModel} from './models'

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
            thread: thread._id,
            isFirstPost: true
        });
        await firstPost.save();

        thread.posts.push(firstPost._id);
        await thread.save();

        user.threads.push(thread._id);
        user.posts.push(firstPost._id);
        await user.save();

        return thread;
    }


    @Mutation(() => Boolean)
    async deleteThread(@Arg("threadID") threadID: string) {
        const deletedThread = await ThreadModel.deleteOne({ _id: threadID });
        if(deletedThread.deletedCount && deletedThread.deletedCount > 0) {
            await PostModel.deleteMany({ thread: threadID });
        }
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

        const total = await ThreadModel.countDocuments({user: user._id})

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
                    select: 'avatar username'
                },
                options: {
                    skip: offset,
                    limit: limit
                }
            })
            .populate({
                path: 'user',
                select: 'username avatar'
            });

        const total = await PostModel.countDocuments({ thread: id })

        return { data: thread, total };
    }



}
