import { faker } from '@faker-js/faker'
import { SaveSurveyResultController } from './save-survey-result.controller'
import { HttpRequest } from './save-survey-result.interface'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { ServerErrorException, ForbidenException, Ok } from '@/presentation/helpers/http/http-helper'
import { LoadSurveyByIdSpy, SaveSurveyResultSpy } from '@/presentation/test'

interface SutTypes {
  sut: SaveSurveyResultController
  loadSurveyByIdSpy: LoadSurveyByIdSpy
  saveSurveyResultSpy: SaveSurveyResultSpy
}

const mockRequest = (answer: string = null): HttpRequest => ({
  params: {
    surveyId: faker.datatype.uuid()
  },
  body: {
    answer
  },
  accountId: faker.datatype.uuid()
})

const makeSut = (): SutTypes => {
  const loadSurveyByIdSpy = new LoadSurveyByIdSpy()
  const saveSurveyResultSpy = new SaveSurveyResultSpy()
  const sut = new SaveSurveyResultController(loadSurveyByIdSpy, saveSurveyResultSpy)
  return {
    sut,
    loadSurveyByIdSpy,
    saveSurveyResultSpy
  }
}

describe('SaveSurveyResult Controller', () => {
  const now = new Date()
  jest.useFakeTimers().setSystemTime(now)

  it('should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdSpy } = makeSut()
    const httpRequest = mockRequest()

    await sut.handle(httpRequest)

    expect(loadSurveyByIdSpy.id).toBe(httpRequest.params.surveyId)
  })

  it('should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdSpy } = makeSut()

    jest.spyOn(loadSurveyByIdSpy, 'loadById').mockResolvedValueOnce(null)
    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(ForbidenException(new InvalidParamError('surveyId')))
  })

  it('should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdSpy } = makeSut()

    jest.spyOn(loadSurveyByIdSpy, 'loadById').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(ServerErrorException(new Error()))
  })

  it('should return 403 if an invalid answer is provided', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(ForbidenException(new InvalidParamError('answer')))
  })

  it('should call SaveSurveyResult with correct values', async () => {
    const { sut, saveSurveyResultSpy, loadSurveyByIdSpy } = makeSut()
    const httpRequest = mockRequest(loadSurveyByIdSpy.surveyModel.answers[0].answer)

    await sut.handle(httpRequest)

    expect(saveSurveyResultSpy.saveSurveyResultParams).toEqual({
      surveyId: httpRequest.params.surveyId,
      accountId: httpRequest.accountId,
      date: new Date(),
      answer: httpRequest.body.answer
    })
  })

  it('should return 500 if SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultSpy, loadSurveyByIdSpy } = makeSut()

    jest.spyOn(saveSurveyResultSpy, 'save').mockRejectedValueOnce(new Error())
    const httpRequest = mockRequest(loadSurveyByIdSpy.surveyModel.answers[0].answer)
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(ServerErrorException(new Error()))
  })

  it('should return 200 on success', async () => {
    const { sut, saveSurveyResultSpy, loadSurveyByIdSpy } = makeSut()
    const httpRequest = mockRequest(loadSurveyByIdSpy.surveyModel.answers[0].answer)

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(Ok(saveSurveyResultSpy.surveyResultModel))
  })
})
