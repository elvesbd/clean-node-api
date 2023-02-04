import { LogControllerDecorator } from './log-controller-decorator'
import { HttpRequest, Controller, HttpResponse } from '@/presentation/interfaces'
import { ServerErrorException, Ok } from '@/presentation/helpers/http/http-helper'
import { mockAccountModel } from '@/domain/test'
import { faker } from '@faker-js/faker'
import { LogErrorRepositorySpy } from '@/data/test/mock-db-log'

interface SutTypes {
  sut: LogControllerDecorator
  controllerSpy: ControllerSpy
  logErrorRepositorySpy: LogErrorRepositorySpy
}

const mockRequest = (): HttpRequest => {
  const password = faker.internet.password()
  return {
    body: {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password,
      passwordConfirmation: password
    }
  }
}

class ControllerSpy implements Controller {
  httpResponse = Ok(mockAccountModel())
  httpRequest: HttpRequest

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.httpRequest = httpRequest
    return await Promise.resolve(this.httpResponse)
  }
}

const makeSut = (): SutTypes => {
  const controllerSpy = new ControllerSpy()
  const logErrorRepositorySpy = new LogErrorRepositorySpy()
  const sut = new LogControllerDecorator(controllerSpy, logErrorRepositorySpy)
  return {
    sut,
    controllerSpy,
    logErrorRepositorySpy
  }
}

const mockServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return ServerErrorException(fakeError)
}

describe('LogController Decorator', () => {
  it('should call controller handle', async () => {
    const { sut, controllerSpy } = makeSut()
    const httpRequest = mockRequest()

    await sut.handle(httpRequest)

    expect(controllerSpy.httpRequest).toEqual(httpRequest)
  })

  it('should creturn the same result of the controller', async () => {
    const { sut, controllerSpy } = makeSut()

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(controllerSpy.httpResponse)
  })

  it('should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerSpy, logErrorRepositorySpy } = makeSut()
    const serverError = mockServerError()
    controllerSpy.httpResponse = serverError

    await sut.handle(mockRequest())

    expect(logErrorRepositorySpy.stack).toBe(serverError.body.stack)
  })
})
