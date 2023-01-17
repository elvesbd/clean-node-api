import { SaveSurveyResultRepository } from '@/data/interfaces/db/survey-result/save-survey-repository'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { mockFakeSurveyResult } from '@/domain/test'
import { SaveSurveyResultDTO } from '@/domain/usecases/survey-result/save-survey-result'

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultDTO): Promise<SurveyResultModel> {
      return mockFakeSurveyResult()
    }
  }
  return new SaveSurveyResultRepositoryStub()
}
