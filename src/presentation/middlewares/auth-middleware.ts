import { Middleware, HttpRequest, HttpResponse, LoadAccountByToken } from './auth-middleware.interfaces'
import { AccessDeniedError } from '@/presentation/errors'
import { ForbidenException, Ok, ServerErrorException } from '@/presentation/helpers/http/http-helper'

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
