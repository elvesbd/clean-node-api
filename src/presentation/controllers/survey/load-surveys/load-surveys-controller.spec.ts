import { LoadSurveysController } from './load-surveys-controller'
import { LoadSurveys } from './load-surveys-controller.interfaces'
import MockDate from 'mockdate'
import { NoContent, Ok, ServerErrorException } from '@/presentation/helpers/http/http-helper'
import { mockFakeSurveys } from '@/domain/test'
import { mockLoadSurveys } from '@/presentation/test/'

interface SutTypes {
  sut: LoadSurveysController
  loadSurveyStub: LoadSurveys
}

const makeSut = (): SutTypes => {
  const loadSurveyStub = mockLoadSurveys()
  const sut = new LoadSurveysController(loadSurveyStub)
  return {
    sut,
    loadSurveyStub
  }
}

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('should call LoadSurveys', async () => {
    const { sut, loadSurveyStub } = makeSut()

    const loadSpy = jest.spyOn(loadSurveyStub, 'load')
    await sut.handle({})

    expect(loadSpy).toHaveBeenCalled()
  })

  it('should return 200 on sucess', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(Ok(mockFakeSurveys()))
  })

  it('should return 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveyStub } = makeSut()

    jest.spyOn(loadSurveyStub, 'load').mockResolvedValueOnce([])
    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(NoContent())
  })

  it('should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveyStub } = makeSut()

    jest.spyOn(loadSurveyStub, 'load').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(ServerErrorException(new Error()))
  })
})
