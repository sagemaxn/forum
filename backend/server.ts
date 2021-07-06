const mongoose = require("mongoose");

import * as Express from "express";
import "reflect-metadata";
import {verify} from 'jsonwebtoken'
const cookieParser = require('cookie-parser')
import * as cors from 'cors'

import { ApolloServer } from "apollo-server-express";
import { buildSchema , UseMiddleware} from "type-graphql";
import { UserResolver } from "./UserResolver";
import {UserModel} from './models/User'

require("dotenv").config();

//console.log(process.env.MONGODB_URI);

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
  const app = Express();
  app.use(cookieParser())
  app.use(cors())

  // app.post("/refresh_token", req =>{
  //   const token = req.cookies._id
  //   if(!token) {
  //     return res.send({ ok: false, accessToken: ''})
  //   }
  // })


  const schema = await buildSchema({
    resolvers: [UserResolver],
  });
  const apolloServer = new ApolloServer({
    schema,
    context: async ({ req, res }) => {
      //console.log(res)
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = verify(
          auth.substring(7), process.env.JWT_SECRET
        )
        console.log(decodedToken)
        //const currentUser = await UserModel.findById(decodedToken)
        //console.log(currentUser)
        const payload = decodedToken
        return { res, payload }
      }
      return { res }
    }
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Server started on 4000");
  });
};
main();
