const mongoose = require("mongoose");

import * as Express from "express";
import "reflect-metadata";
import {verify} from 'jsonwebtoken'

import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./UserResolver";
import {UserModel} from './models/User'

require("dotenv").config();

console.log(process.env.MONGODB_URI);

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const main = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver],
  });
  const apolloServer = new ApolloServer({
    schema,
    context: async ({ req, res }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = verify(
          auth.substring(7), process.env.JWT_SECRET
        )
        console.log(decodedToken)
        const currentUser = await UserModel.find(decodedToken)
        return { currentUser, req, res }
      }
    }
  });

  const app = Express();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Server started on 4000");
  });
};
main();
