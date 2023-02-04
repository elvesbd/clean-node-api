import { SaveSurveyResultRepository } from '@/data/interfaces/db/survey-result/save-survey-repository'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { mockSurveyResultModel } from '@/domain/test'
import { SaveSurveyResultDTO } from '@/domain/usecases/survey-result/save-survey-result'
import { LoadSurveyResultRepository } from '@/data/interfaces/db/survey-result/load-survey-result-repository'

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultDTO): Promise<void> {
      return await Promise.resolve()
    }
  }
  return new SaveSurveyResultRepositoryStub()
}

export class SaveSurveyResultRepositorySpy implements SaveSurveyResultRepository {
  saveSurveyResultParams: SaveSurveyResultDTO

  async save (data: SaveSurveyResultDTO): Promise<void> {
    this.saveSurveyResultParams = data
    return await Promise.resolve()
  }
}

/* export const mockLoadSurveyResultRepository = (): LoadSurveyResultRepository => {
  class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
    async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
      return mockFakeSurveyResult()
    }
  }
  return new LoadSurveyResultRepositoryStub()
} */

export class LoadSurveyResultRepositorySpy implements LoadSurveyResultRepository {
  surveyResultModel = mockSurveyResultModel()
  surveyId: string

  async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
    this.surveyId = surveyId
    return await Promise.resolve(this.surveyResultModel)
  }
}
