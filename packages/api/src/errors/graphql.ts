import { GraphQLError } from 'graphql';

import { Env, CONFIG } from '../config';
import { ErrorGeneral } from './general';
import { ErrorValidationRequired } from './validation';
import { logger } from '../lib/logger';

const gqlRegex = {
  required: /Variable "\$(\w+)" .* Field (\w*) of required type (\w+)! was not provided.$/
};

export const handleGraphQLError = (e: GraphQLError): Error => {

  // Required field missing
  if (gqlRegex.required.test(e.message)) {
    const [, variable, field] = gqlRegex.required.exec(e.message)!;
    return new ErrorValidationRequired(variable, field);
  }

  // If on dev or test and it's an unknown error, return it
  if ([Env.development].includes(CONFIG.env as Env)) {
    return e;
  }

  logger.error(e);
  // Otherwise return a general error in prod-like environment
  return new ErrorGeneral();
};
