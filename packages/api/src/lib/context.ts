import { ContextFunction } from 'apollo-server-core';

import { User } from '../models/User';
import { ErrorAuthInvalidAuthorizationHeader } from '../errors';
import { fingerprint } from './fingerprint';
import { JWTUser, verifyToken } from './tokens';


export interface Context {
  fingerprint: string;
  user?: JWTUser;
  valid: boolean;
  accessToken: string | null;
}

export interface SubscriptionContext extends Context { }


/**
 * Setup the context for each request. If it's a subscription (websocket connection)
 * return the connection context, otherwise retrieve the JWTs from the header.
 */
export const createContext: ContextFunction = async ({ req, connection }) => {

  if (!req || !req.headers) return connection.context;

  // Attempt to load the access token via the header 'Authorization'
  // in 'Bearer xyz' format
  let accessToken = req.headers.authorization;

  if (accessToken) {
    try {
      [, accessToken] = /^Bearer\s(.+)$/.exec(accessToken)!;
      if (!accessToken.length) throw new ErrorAuthInvalidAuthorizationHeader();
    } catch (e) {
      throw new ErrorAuthInvalidAuthorizationHeader();
    }
  }

  return {
    accessToken,
    valid: false,
    fingerprint: fingerprint(req)
  } as Context;
};

/**
 * Upon a successful authentication, decrypt the access token and assign important
 * data to the context.
 * @param token Access token with users data
 * @param ctx HTTP or Subscription context to assign
 */
export const setContextFromToken = async (
  token: string,
  ctx: Context | SubscriptionContext
) => {
  const { user } = await verifyToken(ctx.fingerprint, token);
  ctx.user = user as User;
  ctx.valid = true;
  return ctx;
};
