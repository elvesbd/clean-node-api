import { AddSurveyDTO } from '@/domain/usecases/survey/add-survey'

export interface AddSurveyRepository {
  add: (data: AddSurveyDTO) => Promise<void>

}
