
import { makeSignupValidation } from './signup-validation-factory'
import { RequiredFieldValidation, CompareFieldsValidation, EmailValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/interfaces'
import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'

jest.mock('../../../../../validation/validators/validation-composite')

describe('SignupValidation Factory', () => {
  it('should call ValidationComposite with all validations', () => {
    makeSignupValidation()

    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
