import { ApolloServer } from "apollo-server-express";
import compression from "compression";
import cors from "cors";
import express, { Application } from "express";
import { GraphQLSchema } from "graphql";
import depthLimit from "graphql-depth-limit";
import expressPlayGround from 'graphql-playground-middleware-express';
import { createServer, Server as HTTPServer } from 'http';


class Server {
    private app!: Application;
    private HttpServer!: HTTPServer
    private schema!: GraphQLSchema
    private readonly DEFAULT_PORT_SERVER = process.env.DEFAULT_PORT_SERVER || 3002;

    constructor( schema: GraphQLSchema ) {

        if ( schema === undefined ) {
            throw new Error( "Need GraphQL Schema to work in API Graph" );
        }
        this.schema = schema;
        this.initialize();
    }
    /*
    *   Inicializar todas las configuraciones establecidas en el servidor
    */

    private initialize() {
        this.configExpres();
        this.configApolloServer();
        this.configRoutes();
        this.createServer();
    }

    private configExpres() {
        this.app = express();

        this.app.use ( cors({
            origin: '*'
        }));

        this.app.use ( compression() );

    }

    private configApolloServer() {
        const server = new ApolloServer({
            schema: this.schema,
            introspection: true,
            playground: true,
            validationRules: [ depthLimit(3) ]
        });
        server.applyMiddleware( { app: this.app });
    }

    private configRoutes() {
        this.app.use( '/hello', ( req, resp ) => {
            resp.send( 'Bienvenidos/as al curso de GrapQL desde cero ');
        });
        
        this.app.use( '/', expressPlayGround ({
            endpoint: "/graphql"
        }));
    }

    private createServer() {
        this.HttpServer = createServer( this.app );
        
    }

    listen( callback: ( port: number ) => void ): void {
        this.HttpServer.listen( this.DEFAULT_PORT_SERVER, () => {
            callback(+this.DEFAULT_PORT_SERVER)
        } );
    };
}


export default Server;
