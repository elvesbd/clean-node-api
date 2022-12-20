
import { makeLoginValidation } from './login-validation-factory'
import { EmailValidator } from '../../../../../validation/interfaces/email-validator'
import { Validation } from '../../../../../presentation/interfaces/validation'
import { RequiredFieldValidation } from '../../../../../validation/validators/required-field-validation'
import { EmailValidation } from '../../../../../validation/validators/email-validation'
import { ValidationComposite } from '../../../../../validation/validators/validation-composite'

jest.mock('../../../../../validation/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('LoginValidation Factory', () => {
  it('should call ValidationComposite with all validations', () => {
    makeLoginValidation()

    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
