import { HttpRequest } from './add-survey-controller-interfaces'
import { AddSurveyController } from './add-survey-controller'
import { BadRequestException, NoContent, ServerErrorException } from '@/presentation/helpers/http/http-helper'
import MockDate from 'mockdate'
import { faker } from '@faker-js/faker'
import { ValidationSpy, AddSurveySpy } from '@/presentation/test'

interface SutTypes {
  sut: AddSurveyController
  validationSpy: ValidationSpy
  addSurveySpy: AddSurveySpy
}

const mockRequest = (): HttpRequest => ({
  body: {
    question: faker.random.words(),
    answers: [{
      image: faker.image.imageUrl(),
      answer: faker.random.word()
    }],
    date: new Date()
  }
})

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addSurveySpy = new AddSurveySpy()
  const sut = new AddSurveyController(validationSpy, addSurveySpy)
  return {
    sut,
    validationSpy,
    addSurveySpy
  }
}

describe('AddSurvey Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()

    const httpRequest = mockRequest()
    await sut.handle(httpRequest)

    expect(validationSpy.input).toBe(httpRequest.body)
  })

  it('should return 400 if Validation', async () => {
    const { sut, validationSpy } = makeSut()

    validationSpy.error = new Error()
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(BadRequestException(validationSpy.error))
  })

  it('should call AddSurvey with correct values', async () => {
    const { sut, addSurveySpy } = makeSut()

    const httpRequest = mockRequest()
    await sut.handle(httpRequest)

    expect(addSurveySpy.addSurveyParams).toEqual(httpRequest.body)
  })

  it('should return 500 if AddSurvey throws', async () => {
    const { sut, addSurveySpy } = makeSut()

    jest.spyOn(addSurveySpy, 'add').mockRejectedValueOnce(new Error())
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(ServerErrorException(new Error()))
  })

  it('should return 204 on success', async () => {
    const { sut } = makeSut()

    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(NoContent())
  })
})
