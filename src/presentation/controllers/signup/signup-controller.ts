
import { EmailInUseError } from '../../errors'
import { BadRequestException, Created, ForbidenException, ServerErrorException } from '../../helpers/http/http-helper'
import { Validation } from '../../interfaces/validation'
import { Controller, AddAccount, HttpRequest, HttpResponse, Authentication } from './signup-controller-interfaces'

export class SignupController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return BadRequestException(error)
      }

      const { name, email, password } = httpRequest.body
      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      if (!account) {
        return ForbidenException(new EmailInUseError())
      }

      const accessToken = await this.authentication.auth({ email, password })

      return Created({ accessToken })
    } catch (error) {
      return ServerErrorException(error)
    }
  }
}
