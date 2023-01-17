import { SurveyModel } from '@/domain/models/survey'

export type AddSurveyDTO = Omit<SurveyModel, 'id'>
export interface AddSurvey {
  add: (data: AddSurveyDTO) => Promise<void>
}
