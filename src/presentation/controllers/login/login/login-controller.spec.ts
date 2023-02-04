import { LoginController } from './login-controller'
import { HttpRequest } from './login-controller-interfaces'
import { MissingParamError } from '@/presentation/errors'
import { BadRequestException, Ok, ServerErrorException, UnauthorizedException } from '@/presentation/helpers/http/http-helper'
import { AuthenticationSpy, ValidationSpy } from '@/presentation/test'
import { mockAuthenticationParams } from '@/domain/test'
import { faker } from '@faker-js/faker'

interface SutTypes {
  sut: LoginController
  authenticationSpy: AuthenticationSpy
  validationSpy: ValidationSpy
}

const mockRequest = (): HttpRequest => ({
  body: mockAuthenticationParams()
})

const makeSut = (): SutTypes => {
  const authenticationSpy = new AuthenticationSpy()
  const validationSpy = new ValidationSpy()
  const sut = new LoginController(authenticationSpy, validationSpy)
  return {
    sut,
    authenticationSpy,
    validationSpy
  }
}

describe('Login Controller', () => {
  it('should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const httpRequest = mockRequest()

    await sut.handle(httpRequest)

    expect(authenticationSpy.authenticationParams).toEqual({
      email: httpRequest.body.email,
      password: httpRequest.body.password
    })
  })

  it('should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationSpy } = makeSut()
    authenticationSpy.token = null

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(UnauthorizedException())
  })

  it('should return 500 Authentication throws', async () => {
    const { sut, authenticationSpy } = makeSut()

    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(ServerErrorException(new Error()))
  })

  it('should return 200 if valid credentials are provided', async () => {
    const { sut, authenticationSpy } = makeSut()

    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(Ok({ accessToken: authenticationSpy.token }))
  })

  it('should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()

    validationSpy.error = new MissingParamError(faker.random.word())
    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(BadRequestException(validationSpy.error))
  })
})
