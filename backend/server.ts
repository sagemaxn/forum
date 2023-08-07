const mongoose = require("mongoose");
import * as Express from "express";
import * as cors from 'cors'
import "reflect-metadata";
const cookieParser = require("cookie-parser");

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { json } from 'body-parser';
import * as http from 'http'
import * as process from 'process';

import { buildSchema } from "type-graphql";
import { UserResolver } from "./src/UserResolver";
import { PostResolver } from "./src/PostResolver";
import {ThreadResolver} from "./src/ThreadResolver";
import { AuthResolver } from "./src/AuthResolver";

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

  interface MyContext {
    token?: String;
  }
const main = async () => {
  const app = Express()
  const schema = await buildSchema({
    resolvers: [UserResolver, PostResolver, ThreadResolver, AuthResolver],
    //emitSchemaFile: true
  });
  const httpServer = http.createServer(app);
  const server = new ApolloServer<MyContext>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  app.use(cookieParser());

  app.use(
    '/graphql',
    cors<cors.CorsRequest>({ origin: process.env.NODE_ENV === 'production' ? ['https://forum.sagemaxn.dev'] : 'http://localhost:3000',  credentials: true }),
    json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    }),
  );
  await new Promise<void>((resolve) => httpServer.listen({ port: process.env.PORT || 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
}
main();
