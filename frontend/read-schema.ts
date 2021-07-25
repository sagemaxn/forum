const { readFileSync } = require('fs')

const typeDefs = readFileSync('../backend/schema.gql').toString('utf-8')

//console.log(typeDefs)

const { loadDocuments } = require('@graphql-tools/load')
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader')

async function b(){
const Defs = await loadDocuments('../backend/schema.gql', {
	//file,
	loaders: [
	new GraphQLFileLoader()
	]
})
console.log(Defs)
return Defs
}
b()

//console.log(Defs)