const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
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

const typeDefs = gql`
    type User {
        username: String!,
        password: String
    }

    type Token {
      value: String!
    }

type Query {
    allUsers: [User!]!
    findUser(username: String!): User
}

type Mutation {
    createUser(username: String! password: String!): User
    login(username: String! password: String!): Token
}
`
const resolvers = {
    Query: {
      allUsers: async () => User.find()
    },
    Mutation: {
      createUser: async (root, args) => {
        console.log(args)
        const password = await bcrypt.hash(args.password, 12)
        console.log(password)
        const user = await new User({...args, password});
        console.log(user)
        await user.save()
       user.password = null;
        return user;
      },
      login: async (root, args) => {
        const user = await User.find({username: args.username})
        console.log(user)
        console.log(args.password)
        console.log(user[0].password)
        const password = await bcrypt.compare(args.password, user[0].password)
        console.log(password)
        if(user && password){
          console.log('user logged in')
          return "placeholder"
        }
        else{
          console.log('invalid')
          return null
        }
      }

    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })
  