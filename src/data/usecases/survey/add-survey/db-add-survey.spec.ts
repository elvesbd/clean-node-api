import { DbAddSurvey } from './db-add-survey'
import MockDate from 'mockdate'
import { AddSurveyRepositorySpy } from '@/data/test'
import { mockAddSurveyData } from '@/domain/test'

interface SutTypes {
  sut: DbAddSurvey
  addSurveyRepositorySpy: AddSurveyRepositorySpy
}

const makeSut = (): SutTypes => {
  const addSurveyRepositorySpy = new AddSurveyRepositorySpy()
  const sut = new DbAddSurvey(addSurveyRepositorySpy)
  return {
    sut,
    addSurveyRepositorySpy
  }
}

describe('DbAddSurvey UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositorySpy } = makeSut()

    const surveyData = mockAddSurveyData()
    await sut.add(surveyData)

    expect(addSurveyRepositorySpy.addSurveyParams).toEqual(surveyData)
  })

  it('should throws if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositorySpy } = makeSut()

    jest.spyOn(addSurveyRepositorySpy, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAddSurveyData())

    await expect(promise).rejects.toThrow()
  })
})
