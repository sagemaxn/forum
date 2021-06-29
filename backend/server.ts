const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
//const {ObjectType} = require('type-graphql')
import * as Express from "express"
import "reflect-metadata"

import { ApolloServer } from 'apollo-server-express'
import { buildSchema, Query, Resolver,  } from 'type-graphql'
const User = require('./models/User.ts')


require('dotenv').config()

//console.log(process.env.MONGODB_URI)

const MONGODB_URI = process.env.MONGODB_URI

//console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

@Resolver()
class UserResolver {
  @Query(() => String)
  async hello() {
    return "Hello World"
  }
  @Query(() => )
}  
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