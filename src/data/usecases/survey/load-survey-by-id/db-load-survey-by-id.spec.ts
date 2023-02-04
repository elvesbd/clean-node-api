import { DbLoadSurveyById } from './db-load-survey-by-id'
import { LoadSurveyByIdRepositorySpy } from '@/data/test'
import { faker } from '@faker-js/faker'

interface SutTypes {
  sut: DbLoadSurveyById
  loadSurveyByIdRepositorySpy: LoadSurveyByIdRepositorySpy
}

let surveyId: string

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositorySpy = new LoadSurveyByIdRepositorySpy()
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositorySpy)
  return {
    loadSurveyByIdRepositorySpy,
    sut
  }
}

describe('DbLoadSurveyById', () => {
  jest.useFakeTimers()

  beforeEach(() => {
    surveyId = faker.datatype.uuid()
  })

  it('should call LoadSurveyByIdRepository', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = makeSut()

    await sut.loadById(surveyId)

    expect(loadSurveyByIdRepositorySpy.id).toBe(surveyId)
  })

  it('should return Survey on success', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = makeSut()

    const survey = await sut.loadById(surveyId)

    expect(survey).toEqual(loadSurveyByIdRepositorySpy.surveyModel)
  })

  it('should return 500 if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = makeSut()

    jest.spyOn(loadSurveyByIdRepositorySpy, 'loadById').mockRejectedValueOnce(new Error())
    const promise = sut.loadById('any_id')

    await expect(promise).rejects.toThrow()
  })
})
