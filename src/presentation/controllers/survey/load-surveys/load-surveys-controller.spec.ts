import { LoadSurveysController } from './load-surveys-controller'
import { NoContent, Ok, ServerErrorException } from '@/presentation/helpers/http/http-helper'
import { LoadSurveysSpy } from '../../../test/mock-survey'

interface SutTypes {
  sut: LoadSurveysController
  loadSurveysSpy: LoadSurveysSpy
}

const makeSut = (): SutTypes => {
  const loadSurveysSpy = new LoadSurveysSpy()
  const sut = new LoadSurveysController(loadSurveysSpy)
  return {
    sut,
    loadSurveysSpy

  }
}

describe('LoadSurveys Controller', () => {
  jest.useFakeTimers()

  it('should call LoadSurveys', async () => {
    const { sut, loadSurveysSpy } = makeSut()

    await sut.handle({})

    expect(loadSurveysSpy.callsCount).toBe(1)
  })

  it('should return 200 on success', async () => {
    const { sut, loadSurveysSpy } = makeSut()

    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(Ok(loadSurveysSpy.surveyModels))
  })

  it('should return 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveysSpy } = makeSut()

    loadSurveysSpy.surveyModels = []
    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(NoContent())
  })

  it('should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysSpy } = makeSut()

    jest.spyOn(loadSurveysSpy, 'load').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(ServerErrorException(new Error()))
  })
})
