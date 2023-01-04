import { DbLoadSurveys } from './db-load-surveys'
import { LoadSurveyRepository } from '@/data/interfaces/db/survey/load-survey-repository'
import { SurveyModel } from '@/domain/models/survey'
import MockDate from 'mockdate'

interface SutTypes {
  sut: DbLoadSurveys
  loadSurveyRepositoryStub: LoadSurveyRepository
}

const makeFakeSurveys = (): SurveyModel[] => {
  return [
    {
      id: 'any_id',
      question: 'any_question',
      answers: [
        {
          image: 'any_image',
          answer: 'any_answer'
        }
      ],
      date: new Date()
    },
    {
      id: 'other_id',
      question: 'other_question',
      answers: [
        {
          image: 'any_image',
          answer: 'any_answer'
        }
      ],
      date: new Date()
    }
  ]
}

const makeLoadSurveyRepositoryStub = (): LoadSurveyRepository => {
  class LoadSurveyRepositoryStub implements LoadSurveyRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return makeFakeSurveys()
    }
  }
  return new LoadSurveyRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadSurveyRepositoryStub = makeLoadSurveyRepositoryStub()
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
    expect(surveys).toEqual(makeFakeSurveys())
  })

  it('should return 500 if LoadSurveyRepository throws', async () => {
    const { sut, loadSurveyRepositoryStub } = makeSut()

    jest.spyOn(loadSurveyRepositoryStub, 'loadAll').mockRejectedValueOnce(new Error())
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
