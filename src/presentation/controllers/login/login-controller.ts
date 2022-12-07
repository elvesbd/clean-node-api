import { BadRequestException, UnauthorizedException, Ok, ServerErrorException } from '../../helpers/http/http-helper'
import { Validation } from '../../interfaces/validation'
import { Authentication, Controller, HttpRequest, HttpResponse } from './login-controller-interfaces'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return BadRequestException(error)
      }

      const { email, password } = httpRequest.body

      const accessToken = await this.authentication.auth({ email, password })
      if (!accessToken) {
        return UnauthorizedException()
      }

      return Ok({ accessToken })
    } catch (error) {
      return ServerErrorException(error)
    }
  }
}
