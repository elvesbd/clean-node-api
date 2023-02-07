
import { Controller, AddAccount, HttpRequest, HttpResponse, Authentication, Validation } from './signup-controller-interfaces'
import { EmailInUseError } from '@/presentation/errors'
import { BadRequestException, ForbidenException, Created, ServerErrorException } from '@/presentation/helpers/http/http-helper'

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

      const authenticationModel = await this.authentication.auth({ email, password })

      return Created(authenticationModel)
    } catch (error) {
      return ServerErrorException(error)
    }
  }
}
