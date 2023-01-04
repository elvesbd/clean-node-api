import { MissingParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/interfaces'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fiedlName: string) {}

  validate (input: any): Error | undefined {
    if (!input[this.fiedlName]) {
      return new MissingParamError(this.fiedlName)
    }
  }
}
