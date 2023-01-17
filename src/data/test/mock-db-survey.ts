import { AddSurveyRepository } from '@/data/interfaces/db/survey/add-survey-repository'
import { AddSurveyDTO } from '@/domain/usecases/survey/add-survey'
import { LoadSurveyByIdRepository } from '@/data/usecases/survey/load-survey-by-id/db-load-survey-by-id.interfaces'
import { SurveyModel } from '@/domain/models/survey'
import { mockFakeSurvey, mockFakeSurveys } from '@/domain/test'
import { LoadSurveyRepository } from '@/data/interfaces/db/survey/load-survey-repository'

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (surveyData: AddSurveyDTO): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new AddSurveyRepositoryStub()
}

export const mockLoadSurveyByIdRepositoryStub = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (id: string): Promise<SurveyModel> {
      return mockFakeSurvey()
    }
  }
  return new LoadSurveyByIdRepositoryStub()
}

export const mockLoadSurveyRepository = (): LoadSurveyRepository => {
  class LoadSurveyRepositoryStub implements LoadSurveyRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return mockFakeSurveys()
    }
  }
  return new LoadSurveyRepositoryStub()
}
