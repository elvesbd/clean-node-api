
import { SaveSurveyResult, SurveyResultModel, SaveSurveyResultDTO, SaveSurveyResultRepository } from './db-save-survey-result.interfaces'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (private readonly saveSurveyResultRepository: SaveSurveyResultRepository) {}
  async save (data: SaveSurveyResultDTO): Promise<SurveyResultModel> {
    const surveyResult = await this.saveSurveyResultRepository.save(data)
    return surveyResult
  }
}
