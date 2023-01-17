import { DbLoadSurveys } from './db-load-surveys'
import MockDate from 'mockdate'
import { LoadSurveyRepository } from './db-load-surveys.interfaces'
import { mockLoadSurveyRepository } from '@/data/test'
import { mockFakeSurveys } from '@/domain/test'

interface SutTypes {
  sut: DbLoadSurveys
  loadSurveyRepositoryStub: LoadSurveyRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyRepositoryStub = mockLoadSurveyRepository()
  const sut = new DbLoadSurveys(loadSurveyRepositoryStub)
  return {
    loadSurveyRepositoryStub,
    sut
  }
}

describe('DbLoadSurveys', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('should call LoadSurveyRepository', async () => {
    const { sut, loadSurveyRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadSurveyRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })

  it('should return a list of Surveys on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.load()
    expect(surveys).toEqual(mockFakeSurveys())
  })

  it('should return 500 if LoadSurveyRepository throws', async () => {
    const { sut, loadSurveyRepositoryStub } = makeSut()

    jest.spyOn(loadSurveyRepositoryStub, 'loadAll').mockRejectedValueOnce(new Error())
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
