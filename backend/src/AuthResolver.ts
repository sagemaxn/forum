import {Arg, Ctx, Mutation, Query, Resolver} from "type-graphql";
import {compare, hash} from "bcryptjs";
import {sign, verify} from "jsonwebtoken";

import {LoginToken, User, UserInput, UserModel,} from "./models/User";

import {PostModel} from "./models/Post";

import {get} from "lodash";

const signOptions = () => {
    process.env.NODE_ENV === 'production' ? {
            secure: true,
            sameSite: "none"
        }
        :
        null
}
@Resolver()
export class AuthResolver {
    @Mutation(() => LoginToken)
    checkAuth(@Ctx() { req, res }, @Arg("cookie") cookie: string): LoginToken {
        console.log('jid: ' + req.cookies.jid);

        if (cookie && cookie !== "no refresh") {
            try {
                const payload = verify(cookie, '123456');

                let userID = JSON.stringify(payload).split(",")[0].slice(11, -1);
                res.cookie(
                    "jid",
                    sign({ userID }, '123456', {
                        expiresIn: "5d",
                    }),
                    signOptions
                );
                const user = JSON.stringify(payload).split(",")[1].slice(8, -1);
                const avatar = JSON.stringify(payload).split(",")[2].slice(10, -1);
                const token = sign({ userID, user, avatar }, process.env.JWT_SECRET, {
                    expiresIn: "60m",
                })
                console.log(`token: ${token}`)
                return {
                    token
                };
            } catch (err) {
                console.log(err);
                return { token: "yes but invalid" };
            }
        } else return { token: "no" };
    }
    @Query(() => LoginToken)
    async cookie(@Ctx() { res, req }): Promise<LoginToken> {
        res.cookie(
            "yum",
            sign({ payload: "this is a coookie" }, '123456', {
                expiresIn: "5d",
            }),
            signOptions
        );
        return { token: JSON.stringify(get(req, "cookies.jid") || "no") };
    }

    @Mutation(() => LoginToken)
    async login(
        @Arg("input") { username, password }: UserInput,
        @Ctx() { res }
    ): Promise<LoginToken> {

        res.cookie(
            "hi",
            sign(
                {hi: 'hi'},
                process.env.JWT_REFRESH,
                {
                    expiresIn: "5d",
                }
            ),
            signOptions
        );

        const user = await UserModel.find({ username: username });
        const passwordCorrect = await compare(password, user[0].password);

        if (user && passwordCorrect) {
            const payload = res.cookie(
                "jid",
                sign(
                    {
                        userID: user[0]._id,
                        user: user[0].username,
                        avatar: user[0].avatar,
                    },
                    process.env.JWT_REFRESH,
                    {
                        expiresIn: "5d",
                    }
                ),
                signOptions
            );
            console.log(`payload: ${payload}`)
            const token = sign(
                {
                    userID: user[0]._id,
                    user: user[0].username,
                    avatar: user[0].avatar,
                },
                process.env.JWT_SECRET,
                { expiresIn: "60m" }
            )
            console.log(`(login) token: ${token}`)
            return {
                token: token
            };
        } else {
            return { token: "no token" };
        }
    }
    @Mutation(() => Boolean)
    logout(@Ctx() { res }): boolean {
        console.log(res.cookie.jid);
        res.cookie("jid", "bad token", { maxAge: 0 });
        //res.cookie.jid.expiresIn = "Thu, 01 Jan 1970 00:00:00 GMT"

        return true;
    }
}