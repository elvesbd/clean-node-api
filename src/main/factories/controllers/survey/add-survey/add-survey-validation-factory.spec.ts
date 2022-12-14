
import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { Validation } from '@/presentation/interfaces/validation'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'

jest.mock('../../../../../validation/validators/validation-composite')

describe('AddSurveyValidation Factory', () => {
  it('should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation()

    const validations: Validation[] = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
