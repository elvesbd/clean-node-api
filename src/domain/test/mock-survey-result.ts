import { SurveyResultModel } from '@/domain/models/survey-result'
import { SaveSurveyResultDTO } from '@/domain/usecases/survey-result/save-survey-result'

export const mockFakeSurveyResult = (): SurveyResultModel => ({
  id: 'any_id',
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date()
})

export const mockFakeSaveSurveyResultData = (): SaveSurveyResultDTO => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date()
})

export const mockSurveyResult = (): SurveyResultModel => ({
  id: 'any_id',
  surveyId: 'any_survey_id',
  accountId: 'any_account_id',
  date: new Date(),
  answer: 'any_answer'
})
