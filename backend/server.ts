const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {ObjectType} = require('type-graphql')
import * as Express from "express"
import "reflect-metadata"
import {prop, getModelForClass} from '@typegoose/typegoose'

import { ApolloServer } from 'apollo-server-express'
import { Arg, buildSchema, Field, Int, Mutation, Query, Resolver, InputType } from 'type-graphql'
//const User = require('./models/User.ts')


require('dotenv').config()

console.log(process.env.MONGODB_URI)

const MONGODB_URI = process.env.MONGODB_URI

//console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


@ObjectType()
export class User{
    @Field(() => String)
    @prop({type: String})
    public username: string;

    //@Field(() => String)
    @prop({type: String})
    public password: string;
}
const UserModel = getModelForClass(User);

@InputType()
class UserInput {
  @Field()
  username: string

  @Field()
  password: string
}

@Resolver()
class UserResolver {
  @Query(() => String)
  query(){
  return 'yo'
}
  @Mutation(() => User)
  async createUser(
  @Arg('input'){username, password}: UserInput): Promise<User> {
    //console.log(input)
    password = await bcrypt.hash(password, 12)
    const user = await UserModel.create({username, password})
    user.save()
   // user.password = null
    return user
  }
  }
//Mutation: {
  //       createUser: async (root, args) => {
  //         console.log(args)
  //         const password = await bcrypt.hash(args.password, 12)
  //         console.log(password)
  //         const user = await new User({...args, password});
  //         console.log(user)
  //         await user.save()
  //        user.password = null;
  //         return user;
  //       },
// const typeDefs = gql`
//     type User {
//         username: String!,
//         password: String
//     }
//     type Token {
//       value: String!
//     }


const main = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver]
  })
  const apolloServer = new ApolloServer({ schema });

  const app = Express();

  apolloServer.applyMiddleware({app});

  app.listen(4000, () => {
    console.log('Server started on 4000')
  })
}
main()
// const typeDefs = gql`
//     type User {
//         username: String!,
//         password: String
//     }
//     type Token {
//       value: String!
//     }

// type Query {
//     allUsers: [User!]!
//     findUser(username: String!): User
// }

// type Mutation {
//     createUser(username: String! password: String!): User
//     login(username: String! password: String!): Token
// }
// `
// const resolvers = {
//     Query: {
//       allUsers: async () => User.find()
//     },
//     Mutation: {
//       createUser: async (root, args) => {
//         console.log(args)
//         const password = await bcrypt.hash(args.password, 12)
//         console.log(password)
//         const user = await new User({...args, password});
//         console.log(user)
//         await user.save()
//        user.password = null;
//         return user;
//       },
//       login: async (root, args) => {
//         const user = await User.find({username: args.username})
//         console.log(user)
//         console.log(args.password)
//         console.log(user[0].password)
//         const password = await bcrypt.compare(args.password, user[0].password)
//         console.log(password)
//         if(user && password){
//           console.log('user logged in')
//           return "placeholder"
//         }
//         else{
//           console.log('invalid')
//           return null
//         }
//       }

//     }
// }