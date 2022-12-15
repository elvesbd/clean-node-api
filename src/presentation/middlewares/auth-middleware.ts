import { AccessDeniedError } from '../errors'
import { ForbidenException, Ok } from '../helpers/http/http-helper'
import { HttpRequest, HttpResponse, Middleware } from '../interfaces'
import { LoadAccountByToken } from '../../domain/usecases/load-account-by-token'

export class AuthMiddleware implements Middleware {
  constructor (private readonly loadAccountByToken: LoadAccountByToken) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']
    if (accessToken) {
      const account = await this.loadAccountByToken.load(accessToken)
      if (account) {
        return Ok({ accountId: account.id })
      }
    }
    return ForbidenException(new AccessDeniedError())
  }
}
