import { AddSurveyRepository } from '@/data/interfaces/db/survey/add-survey-repository'
import { AddSurveyDTO } from '@/domain/usecases/survey/add-survey'
import { LoadSurveyByIdRepository } from '@/data/usecases/survey/load-survey-by-id/db-load-survey-by-id.interfaces'
import { SurveyModel } from '@/domain/models/survey'
import { mockSurveyModel, mockSurveyModels } from '@/domain/test'
import { LoadSurveyRepository } from '@/data/interfaces/db/survey/load-survey-repository'

/* export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (surveyData: AddSurveyDTO): Promise<void> {
      return await Promise.resolve()
    }
  }
  return new AddSurveyRepositoryStub()
} */

export class AddSurveyRepositorySpy implements AddSurveyRepository {
  addSurveyParams: AddSurveyDTO

  async add (data: AddSurveyDTO): Promise<void> {
    this.addSurveyParams = data
    return await Promise.resolve()
  }
}

/* export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (id: string): Promise<SurveyModel> {
      return mockFakeSurvey()
    }
  }
  return new LoadSurveyByIdRepositoryStub()
} */

export class LoadSurveyByIdRepositorySpy implements LoadSurveyByIdRepository {
  surveyModel = mockSurveyModel()
  id: string

  async loadById (id: string): Promise<SurveyModel> {
    this.id = id
    return await Promise.resolve(this.surveyModel)
  }
}

/* export const mockLoadSurveyRepository = (): LoadSurveyRepository => {
  class LoadSurveyRepositoryStub implements LoadSurveyRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return mockFakeSurveys()
    }
  }
  return new LoadSurveyRepositoryStub()
} */

export class LoadSurveysRepositorySpy implements LoadSurveyRepository {
  surveyModels = mockSurveyModels()
  callsCount = 0

  async loadAll (): Promise<SurveyModel[]> {
    this.callsCount++
    return await Promise.resolve(this.surveyModels)
  }
}
