// tslint:disable variable-name
import { ErrorCode } from './codes';
import { ErrorBadRequest, ErrorUnauthorized } from './general';


export class ErrorAuthUnauthenticated extends ErrorUnauthorized {
  code = ErrorCode.AuthUnauthenticated;
  constructor() {
    super('You need to be authenticated');
  }
}
export class ErrorAuthInvalidDetails extends ErrorBadRequest {
  code = ErrorCode.AuthInvalidDetails;
  constructor() {
    super('Incorrect login details');
  }
}
export class ErrorAuthOauthCode extends ErrorBadRequest {
  code = ErrorCode.ErrorAuthOauthCode;
  constructor() {
    super('Could not login with that code');
  }
}
export class ErrorAuthEmailNotVerified extends ErrorBadRequest {
  code = ErrorCode.AuthEmailNotVerified;
  constructor() {
    super('Email is not verified');
  }
}
export class ErrorAuthInvalidToken extends ErrorUnauthorized {
  code = ErrorCode.AuthInvalidToken;
  constructor() {
    super('Invalid access token');
  }
}
export class ErrorAuthInvalidAuthorizationHeader extends ErrorBadRequest {
  code = ErrorCode.AuthInvalidAuthorizationHeader;
  constructor() {
    super('Invalid Authorization header');
  }
}
export class ErrorAuthNoAccess extends ErrorUnauthorized {
  code = ErrorCode.AuthNoAccess;
  constructor(resource: string) {
    super(`You do not have access to this ${resource.toLowerCase()}`);
  }
}
export class ErrorAuthPasswordMismatch extends ErrorBadRequest {
  code = ErrorCode.AuthPasswordMismatch;
  constructor() {
    super('Passwords do not match');
  }
}
export class ErrorAuthIncorrectPassword extends ErrorBadRequest {
  code = ErrorCode.AuthIncorrectPassword;
  constructor() {
    super('Incorrect password');
  }
}
