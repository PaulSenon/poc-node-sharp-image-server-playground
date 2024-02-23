import { Request } from 'express';

export default interface IRequestValidator<T> {
  validate(request: Request): T;
}
