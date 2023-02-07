import { BadRequestException, UnauthorizedException, Ok, ServerErrorException } from '@/presentation/helpers/http/http-helper'
import { Authentication, Controller, HttpRequest, HttpResponse, Validation } from './login-controller-interfaces'

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

      const authenticationModel = await this.authentication.auth({ email, password })
      if (!authenticationModel) {
        return UnauthorizedException()
      }

      return Ok(authenticationModel)
    } catch (error) {
      return ServerErrorException(error)
    }
  }
}
