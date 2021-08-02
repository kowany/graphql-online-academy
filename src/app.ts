import express from 'express';
import cors from 'cors';
import compression from 'compression';
import { createServer } from 'http';
import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from 'apollo-server-express';
import expressPlayGround  from "graphql-playground-middleware-express";


// Configurando el servidor de apollo-server-express
const app = express();

app.use ( cors({
    origin: '*'
}));

app.use ( compression() );

// Definir los tipos de definiciones ( los contratos de graphQL)

const typeDefs = `
    type Query {
        hello: String!
        helloWithName( name: String! ): String!
        peopleNumber: Int!
    }
`;
// Dar solución a las definiciones
const resolvers = {
    Query: {
        hello(): string {
            return 'Hola mundo';
        },
        helloWithName( _: object, args: { name: string },
            __: object, info: object ): string {
            console.log( info )
            return `Hola ${args.name}, bienvenido/a al curso graphQL`
        },
        peopleNumber(): number {
            return 1
        }
    }
};

// Construir el schema

const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
});

// Configurar el servidor apollo-server
const server = new ApolloServer({
    schema,
    introspection: true,
    playground: true
});

server.applyMiddleware( { app });

app.use( '/hello', ( req, resp ) => {
    resp.send( 'Bienvenidos/as al curso de GrapQL desde cero ');
});

app.use( '/', expressPlayGround ({
    endpoint: "/graphql"
}));

const httpServer = createServer( app );

httpServer.listen( 
    {
        port: 3002
    },
    () => console.log( "Bienvenidos/as: https://localhost:3002/graphql" )
);