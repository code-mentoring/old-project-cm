import { AuthChecker } from 'type-graphql';
import { Context, setContextFromToken } from './context';
import { ErrorAuthUnauthenticated } from '../errors';


export const authChecker: AuthChecker<Context> = async ({ context }) => {
  // If unauthenticated, throw 400 error
  if (!context.accessToken) throw new ErrorAuthUnauthenticated();
  // Attempt to decrypt and verify the accessToken and assign data to context
  await setContextFromToken(context.accessToken, context);
  return true;
};
