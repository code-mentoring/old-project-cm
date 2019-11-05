import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import { Express } from 'express';
import { Server } from 'http';
import { buildSchema } from 'type-graphql';

import { CONFIG } from '../../config';
import { resolvers } from '../../gql/resolvers';
import { authChecker } from '../../lib/auth';
import { createContext as context, setContextFromToken, SubscriptionContext } from '../../lib/context';
import { ErrorAuthInvalidToken, ErrorAuthUnauthenticated } from '../../errors';


export const schema = () => buildSchema({
  dateScalarMode: 'isoDate',
  validate: false,
  resolvers,
  authChecker,
});

export interface SubscriptionOptions {
  token: string;
}

export const apollo = async (app: Express, server: Server) => {
  const apolloServer = new ApolloServer({
    schema: await schema(),
    context,

    subscriptions: {
      onConnect: async (connectionParams, _websocket, context) => {
        const token = (connectionParams as SubscriptionOptions).token;
        if (token) {
          try {
            await setContextFromToken(
              token,
              context as unknown as SubscriptionContext
            );
            return context;
          } catch (e) {
            throw new ErrorAuthInvalidToken();
          }
        }

        throw new ErrorAuthUnauthenticated();
      }
    }
  });

  apolloServer.applyMiddleware({
    app, cors: {
      origin: CONFIG.corsAllowFrom,
      credentials: true,
      optionsSuccessStatus: 200,
    }
  });
  apolloServer.installSubscriptionHandlers(server);
};
