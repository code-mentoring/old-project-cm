import { ErrorCode } from './codes';
import { ErrorBadRequest } from './general';


export enum ValidationRule {
  required = 'required',
  password = 'password',
  minLength = 'minLength',
  maxLength = 'maxLength'
}

class ErrorValidationBase<R extends ValidationRule> extends ErrorBadRequest<{
  field: string,
  rule: R,
  received: any
  variable?: string
}> {
  code = ErrorCode.Validation;
  status = 400;
}

export class ErrorValidationPassword extends ErrorValidationBase<ValidationRule.password> {
  constructor(field: string) {
    super(`${field} is not a valid password`);
    this.details = { field, rule: ValidationRule.password, received: null };
  }
}

export class ErrorValidationRequired extends ErrorValidationBase<ValidationRule.required> {
  constructor(variable: string, field: string) {
    super(`${field} is required`);
    this.details = { variable, field, rule: ValidationRule.required, received: null };
  }
}

export class ErrorValidationMin extends ErrorValidationBase<ValidationRule.minLength> {
  constructor(field: string, length: number, received: string) {
    super(`${field} is too short. Should be a minimum of ${length} characters`);
    this.details = { field, rule: ValidationRule.minLength, received };
  }
}

export class ErrorValidationMax extends ErrorValidationBase<ValidationRule.maxLength> {
  constructor(field: string, length: number, received: string) {
    super(`${field} is too long. Should be a maximum of ${length} characters`);
    this.details = { field, rule: ValidationRule.maxLength, received };
  }
}
