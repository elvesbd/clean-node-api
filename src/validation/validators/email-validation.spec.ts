import { EmailValidation } from './email-validation'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { faker } from '@faker-js/faker'
import { EmailValidatorSpy } from '../test'

const field = faker.random.word()
interface SutTypes {
  sut: EmailValidation
  emailValidatorSpy: EmailValidatorSpy
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy()
  const sut = new EmailValidation(field, emailValidatorSpy)
  return {
    sut,
    emailValidatorSpy
  }
}

describe('Email Validation', () => {
  it('should return an erro with EmailValidator returns false', () => {
    const { sut, emailValidatorSpy } = makeSut()

    emailValidatorSpy.isEmailValid = false
    const email = faker.internet.email()
    const error = sut.validate({ [field]: email })

    expect(error).toEqual(new InvalidParamError(field))
  })

  it('should call EmailValidator with correct email', () => {
    const { sut, emailValidatorSpy } = makeSut()

    const email = faker.internet.email()
    sut.validate({ [field]: email })

    expect(emailValidatorSpy.email).toBe(email)
  })

  it('should throw if EmailValidator throws', () => {
    const { sut, emailValidatorSpy } = makeSut()

    jest.spyOn(emailValidatorSpy, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    expect(sut.validate).toThrow()
  })
})
