import { ValidationComposite } from './validation-composite'
import { MissingParamError } from '@/presentation/errors'
import { faker } from '@faker-js/faker'
import { ValidationSpy } from '@/presentation/test'

const field = faker.random.word()
interface SutTypes {
  sut: ValidationComposite
  validationSpies: ValidationSpy[]
}

const makeSut = (): SutTypes => {
  const validationSpies = [
    new ValidationSpy(),
    new ValidationSpy()
  ]
  const sut = new ValidationComposite(validationSpies)
  return {
    sut,
    validationSpies
  }
}

describe('Validation Composite', () => {
  it('should return an erro if any validation fails', () => {
    const { sut, validationSpies } = makeSut()

    validationSpies[1].error = new MissingParamError(field)
    const error = sut.validate({ [field]: faker.random.word() })

    expect(error).toEqual(validationSpies[1].error)
  })

  it('should return the first erro if more than one validation fails', () => {
    const { sut, validationSpies } = makeSut()

    validationSpies[0].error = new Error()
    validationSpies[1].error = new MissingParamError(field)
    const error = sut.validate({ [field]: faker.random.word() })

    expect(error).toEqual(validationSpies[0].error)
  })

  it('should not return if validation succeeds', () => {
    const { sut } = makeSut()

    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toBeFalsy()
  })
})
