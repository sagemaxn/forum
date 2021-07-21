import {
	ApolloClient, InMemoryCache, NormalizedCacheObject,
} from '@apollo/client'
import { useMemo } from 'react'

import { buildSchema } from "type-graphql";
const schema3 = require('./generated/graphql')
import * as genSchema from './generated/graphql'
const types = {...genSchema}
console.log(types)

async function bootstrap() {
   const schema = await buildSchema({
    resolvers: [schema3],
  });
  console.log(schema)
}
bootstrap()


let apolloClient: ApolloClient<NormalizedCacheObject>;

async function createIsomorphicLink() {
	if (typeof window === 'undefined') {
		// server
		const { SchemaLink } = require("@apollo/client/link/schema")
		//async function bootstrap() {
			const schema = await buildSchema({
			 resolvers: [schema3],
		   });
		   console.log(schema)
		
		return new SchemaLink({ schema })
	} else {
		// client
		const { HttpLink } = require ('@apollo/client/link/http')
		return new HttpLink({ uri: 'http://localhost:4000' })
	}
}

function createApolloClient() {
	return new ApolloClient({
		ssrMode: typeof window === "undefined",
		link: createIsomorphicLink(),
		cache: new InMemoryCache()
	})
}

export function initializeApollo(initialState = null) {
	const _apolloClient = apolloClient ?? createApolloClient()

	if (initialState) {
		_apolloClient.cache.restore(initialState)
	}

	if (typeof window === "undefined") return _apolloClient
		apolloClient = apolloClient ?? _apolloClient

	return _apolloClient
}

export function useApollo(initialState) {
	const store = useMemo(() => initializeApollo(initialState), [initialState])
	return store
}