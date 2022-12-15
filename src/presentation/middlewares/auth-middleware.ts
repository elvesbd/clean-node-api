import { AccessDeniedError } from '../errors'
import { ForbidenException, Ok, ServerErrorException } from '../helpers/http/http-helper'
import { Middleware, HttpRequest, HttpResponse, LoadAccountByToken } from './auth-middleware.interfaces'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string

  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (accessToken) {
        const account = await this.loadAccountByToken.load(accessToken, this.role)
        if (account) {
          return Ok({ accountId: account.id })
        }
      }
      return ForbidenException(new AccessDeniedError())
    } catch (error) {
      return ServerErrorException(error)
    }
  }
}
