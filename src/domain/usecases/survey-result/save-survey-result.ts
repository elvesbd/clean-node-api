import { SurveyResultModel } from '@/domain/models/survey-result'

export type SaveSurveyResultDTO = Omit<SurveyResultModel, 'id'>

export interface SaveSurveyResult {
  save: (data: SaveSurveyResultDTO) => Promise<SurveyResultModel>
}
