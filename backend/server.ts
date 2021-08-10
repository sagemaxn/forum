const mongoose = require("mongoose");

import * as Express from "express";
import "reflect-metadata";
import { verify } from "jsonwebtoken";
const cookieParser = require("cookie-parser");
const cors = require("cors");

import { ApolloServer } from "apollo-server-express";
import { buildSchema, UseMiddleware } from "type-graphql";
import { UserResolver } from "./src/UserResolver";
import { UserModel } from "./models/User";

require("dotenv").config();

//console.log(process.env.MONGODB_URI);
const app = Express();

app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    origin: 'http://localhost:3000',
  })
);

app.use(cookieParser());
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
    //emitSchemaFile: true
  });
  const apolloServer = new ApolloServer({
    schema,
    context: async ({ req, res }) => {
      return { res, req, payload: "asd" };
    },
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Server started on 4000");
  });
};
main();
