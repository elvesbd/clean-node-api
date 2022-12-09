import { AddSurveyModel } from '../../../usecases/add-survey/db-add-survey-interfaces'

export interface AddSurveyRepository {
  add: (surveyData: AddSurveyModel) => Promise<void>
}
