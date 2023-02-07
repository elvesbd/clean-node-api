import { DbLoadSurveys } from './db-load-surveys'
import { LoadSurveysRepositorySpy } from '@/data/test'
import { faker } from '@faker-js/faker'

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
  const accountId = faker.datatype.uuid()

  it('should call LoadSurveyRepository with correct value', async () => {
    const { sut, loadSurveysRepositorySpy } = makeSut()

    await sut.load(accountId)

    expect(loadSurveysRepositorySpy.accountId).toBe(accountId)
  })

  it('should return a list of Surveys on success', async () => {
    const { sut, loadSurveysRepositorySpy } = makeSut()

    const surveys = await sut.load(accountId)

    expect(surveys).toEqual(loadSurveysRepositorySpy.surveyModels)
  })

  it('should return 500 if LoadSurveyRepository throws', async () => {
    const { sut, loadSurveysRepositorySpy } = makeSut()

    jest.spyOn(loadSurveysRepositorySpy, 'loadAll').mockRejectedValueOnce(new Error())
    const promise = sut.load(accountId)

    await expect(promise).rejects.toThrow()
  })
})
