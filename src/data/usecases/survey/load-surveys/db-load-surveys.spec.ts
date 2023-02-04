import { DbLoadSurveys } from './db-load-surveys'
import { LoadSurveysRepositorySpy } from '@/data/test'

interface SutTypes {
  sut: DbLoadSurveys
  loadSurveysRepositorySpy: LoadSurveysRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositorySpy = new LoadSurveysRepositorySpy()
  const sut = new DbLoadSurveys(loadSurveysRepositorySpy)
  return {
    loadSurveysRepositorySpy,
    sut
  }
}

describe('DbLoadSurveys', () => {
  jest.useFakeTimers()

  it('should call LoadSurveyRepository', async () => {
    const { sut, loadSurveysRepositorySpy } = makeSut()

    await sut.load()

    expect(loadSurveysRepositorySpy.callsCount).toBe(1)
  })

  it('should return a list of Surveys on success', async () => {
    const { sut, loadSurveysRepositorySpy } = makeSut()

    const surveys = await sut.load()

    expect(surveys).toEqual(loadSurveysRepositorySpy.surveyModels)
  })

  it('should return 500 if LoadSurveyRepository throws', async () => {
    const { sut, loadSurveysRepositorySpy } = makeSut()

    jest.spyOn(loadSurveysRepositorySpy, 'loadAll').mockRejectedValueOnce(new Error())
    const promise = sut.load()

    await expect(promise).rejects.toThrow()
  })
})
