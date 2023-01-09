import { SaveSurveyResultModel } from '../../../domain/usecases/save-survey-result'
import { SurveyResultModel } from '../../../domain/models/survey-result'
import { SaveSurveyResultRepository } from '../../interfaces/db/survey/save-survey-repository'
import { DbSaveSurveyResult } from './db-save-survey-result'

interface SutTypes {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
}

const makeFakeSurveyResult = (): SaveSurveyResultModel => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date()
})

const makeFakeSaveSurveyResultData = (): SurveyResultModel => ({
  id: 'any_id',
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date()
})

const makeSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return makeFakeSaveSurveyResultData()
    }
  }
  return new SaveSurveyResultRepositoryStub()
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepository()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)
  return {
    sut,
    saveSurveyResultRepositoryStub
  }
}

describe('DbSaveSurveyResult UseCase', () => {
  const now = new Date()
  jest.useFakeTimers().setSystemTime(now)

  it('should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')

    const surveyResultData = makeFakeSurveyResult()
    await sut.save(surveyResultData)
    expect(saveSpy).toHaveBeenCalledWith(surveyResultData)
  })
})
