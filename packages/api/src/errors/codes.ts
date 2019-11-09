export enum ErrorCode {
  Validation = 'Validation',

  AuthUnauthorized = 'AuthUnauthorized',
  AuthUnauthenticated = 'AuthUnauthenticated',
  AuthInvalidDetails = 'AuthInvalidDetails',
  ErrorAuthOauthCode = 'ErrorAuthOauthCode',
  AuthEmailNotVerified = 'AuthEmailNotVerified',
  AuthInvalidToken = 'AuthInvalidToken',
  AuthInvalidAuthorizationHeader = 'AuthInvalidAuthorizationHeader',
  AuthNoAccess = 'AuthNoAccess',
  AuthPasswordMismatch = 'AuthPasswordMismatch',
  AuthIncorrectPassword = 'AuthIncorrectPassword',

  Base = 'Base',
  General = 'General',
  BadRequest = 'BadRequest',
  Unauthorized = 'Unauthorized',
  NotFound = 'NotFound',

  ResourceNotFound = 'ResourceNotFound',
  ResourceUnique = 'ResourceUnique'
}

