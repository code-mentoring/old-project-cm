// tslint:disable variable-name
import { ApolloError } from 'apollo-server-core';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, UNAUTHORIZED, NOT_FOUND } from 'http-status';
import { ErrorCode } from './codes';

export class ErrorBase<T = undefined> extends ApolloError {
  ligrError = true;
  code: ErrorCode;
  status?: number;
  details: T;
}

export class ErrorGeneral<T = undefined> extends ErrorBase<T> {
  constructor(error: string = 'An unknown error occurred') {
    super(error, INTERNAL_SERVER_ERROR.toString());
  }
}

export class ErrorBadRequest<T = undefined> extends ErrorBase<T> {
  constructor(error: string) {
    super(error, BAD_REQUEST.toString());
  }
}

export class ErrorUnauthorized<T = undefined> extends ErrorBase<T> {
  code = ErrorCode.AuthUnauthorized;
  constructor(error: string = 'You are not authorized for this action') {
    super(error, UNAUTHORIZED.toString());
  }
}

export class ErrorNotFound<T = undefined> extends ErrorBase<T> {
  constructor(error: string = 'Resource not found') {
    super(error, NOT_FOUND.toString());
  }
}
