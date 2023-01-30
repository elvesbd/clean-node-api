import { SurveyResultModel } from '@/domain/models/survey-result'
import { mockFakeSurveyResult } from '@/domain/test'
import { DbLoadSurveyResult } from './db-load-survey-result'
import { LoadSurveyResultRepository } from '@/data/interfaces/db/survey-result/load-survey-result-repository'

describe('DbLoadSurveyResult UseCase', () => {
  it('should call LoadSurveyResultRepository', async () => {
    class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
      async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
        return mockFakeSurveyResult()
      }
    }
    const loadSurveyResultRepositoryStub = new LoadSurveyResultRepositoryStub()
    const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub)
    const loadBySurveyByIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    await sut.load('any_survey_id')
    expect(loadBySurveyByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })
})
