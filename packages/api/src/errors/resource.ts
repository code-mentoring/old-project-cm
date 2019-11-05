// tslint:disable variable-name
import { ErrorBadRequest, ErrorNotFound } from './general';
import { ErrorCode } from './codes';

export class ErrorResourceNotFound extends ErrorNotFound {
  code = ErrorCode.ResourceNotFound;
  constructor(resourceName: string, value?: string | number, property: string = 'id') {
    super(`No ${resourceName.toLowerCase()} found${value ? ` with ${property} '${value}'` : ''}`);
  }
}

export class ErrorResourceUnique extends ErrorBadRequest {
  code = ErrorCode.ResourceUnique;
  constructor(
    resourceName: string,
    field: string,
    value: string
  ) {
    super(`A ${resourceName.toLowerCase()} already exists with '${field}' as '${value}'`);
  }
}
