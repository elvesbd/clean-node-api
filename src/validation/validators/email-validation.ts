import { EmailValidator } from '@/validation/interfaces/email-validator'
import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/interfaces'

export class EmailValidation implements Validation {
  constructor (
    private readonly fiedlName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate (input: any): Error | undefined {
    const isValid = this.emailValidator.isValid(input[this.fiedlName])
    if (!isValid) {
      return new InvalidParamError(this.fiedlName)
    }
  }
}
