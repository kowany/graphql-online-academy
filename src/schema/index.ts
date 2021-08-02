import 'graphql-import-node';

import { makeExecutableSchema } from "apollo-server-express";
import { GraphQLSchema } from "graphql";

import typeDefs from './schema.graphql';
import resolvers from "./../resolvers";


const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers
});

export default schema;