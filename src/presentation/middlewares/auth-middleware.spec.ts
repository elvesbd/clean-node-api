import { AuthMiddleware } from './auth-middleware'
import { HttpRequest } from './auth-middleware.interfaces'
import { ForbidenException, Ok, ServerErrorException } from '@/presentation/helpers/http/http-helper'
import { AccessDeniedError } from '@/presentation/errors'
import { LoadAccountByTokenSpy } from '../test'

interface SutTypes {
  sut: AuthMiddleware
  loadAccountByTokenSpy: LoadAccountByTokenSpy
}

const mockRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': 'any_token'
  }
})

const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenSpy = new LoadAccountByTokenSpy()
  const sut = new AuthMiddleware(loadAccountByTokenSpy, role)
  return {
    loadAccountByTokenSpy,
    sut
  }
}

describe('Auth Middleware', () => {
  it('should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ForbidenException(new AccessDeniedError()))
  })

  it('should call LoadAccountByToken with correct accessToken', async () => {
    const role = 'any_role'
    const { sut, loadAccountByTokenSpy } = makeSut(role)
    const httpRequest = mockRequest()

    await sut.handle(httpRequest)

    expect(loadAccountByTokenSpy.accessToken).toBe(httpRequest.headers['x-access-token'])
    expect(loadAccountByTokenSpy.role).toBe(role)
  })

  it('should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()

    loadAccountByTokenSpy.accountModel = null
    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(ForbidenException(new AccessDeniedError()))
  })

  it('should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()

    jest.spyOn(loadAccountByTokenSpy, 'load').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(ServerErrorException(new Error()))
  })

  it('should return 200 if LoadAccountByToken returns an account', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()

    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(Ok({
      accountId: loadAccountByTokenSpy.accountModel.id
    }))
  })
})
