const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose')

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
        username: String!
    }

type Query {
    allUsers: [User!]!
    findUser(username: String!): User
}
`
const resolvers = {
    Query: {
       // allUsers: async () => User.find()
    }
}

const server = new ApolloServer({
    typeDefs
    //resolvers
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })
  