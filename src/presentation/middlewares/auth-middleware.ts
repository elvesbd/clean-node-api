import { AccessDeniedError } from '../errors'
import { ForbidenException } from '../helpers/http/http-helper'
import { HttpRequest, HttpResponse, Middleware } from '../interfaces'

export class AuthMiddleware implements Middleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return ForbidenException(new AccessDeniedError())
  }
}
