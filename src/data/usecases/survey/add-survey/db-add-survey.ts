import { AddSurvey, AddSurveyDTO, AddSurveyRepository } from './db-add-survey-interfaces'

export class DbAddSurvey implements AddSurvey {
  constructor (private readonly addsurveyRepository: AddSurveyRepository) {}
  async add (data: AddSurveyDTO): Promise<void> {
    await this.addsurveyRepository.add(data)
  }
}
