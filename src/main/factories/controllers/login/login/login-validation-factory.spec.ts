
import { makeLoginValidation } from './login-validation-factory'
import { EmailValidation } from '@/validation/validators/email-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'
import { RequiredFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/interfaces/validation'
import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'

jest.mock('../../../../../validation/validators/validation-composite')

describe('LoginValidation Factory', () => {
  it('should call ValidationComposite with all validations', () => {
    makeLoginValidation()

    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
