import { AuthMiddleware } from './auth-middleware'
import { LoadAccountByToken, HttpRequest } from './auth-middleware.interfaces'
import { ForbidenException, Ok, ServerErrorException } from '@/presentation/helpers/http/http-helper'
import { AccessDeniedError } from '@/presentation/errors'
import { mockLoadAccountByToken } from '@/presentation/test'

interface SutTypes {
  sut: AuthMiddleware
  loadAccountByTokenStub: LoadAccountByToken
}

const makeFakeRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': 'any_token'
  }
})

const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenStub = mockLoadAccountByToken()
  const sut = new AuthMiddleware(loadAccountByTokenStub, role)
  return {
    loadAccountByTokenStub,
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
    const { sut, loadAccountByTokenStub } = makeSut(role)

    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')

    await sut.handle(makeFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_token', role)
  })

  it('should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()

    jest.spyOn(loadAccountByTokenStub, 'load').mockResolvedValueOnce(null)

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ForbidenException(new AccessDeniedError()))
  })

  it('should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()

    jest.spyOn(loadAccountByTokenStub, 'load').mockRejectedValueOnce(new Error())

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ServerErrorException(new Error()))
  })

  it('should return 200 if LoadAccountByToken returns an account', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(Ok({ accountId: 'any_id' }))
  })
})
