import { SurveyResultModel } from '@/domain/models/survey-result'
import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'
import { mockFakeSurvey, mockFakeSurveys, mockSurveyResult } from '@/domain/test'
import { SaveSurveyResult, SaveSurveyResultDTO } from '@/domain/usecases/survey-result/save-survey-result'
import { AddSurvey, AddSurveyDTO } from '@/domain/usecases/survey/add-survey'
import { LoadSurveys } from '@/domain/usecases/survey/load-surveys'
import { SurveyModel } from '@/domain/models/survey'

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return mockFakeSurvey()
    }
  }
  return new LoadSurveyByIdStub()
}

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save (data: SaveSurveyResultDTO): Promise<SurveyResultModel> {
      return mockSurveyResult()
    }
  }
  return new SaveSurveyResultStub()
}

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (data: AddSurveyDTO): Promise<void> {
      return await new Promise<void>(resolve => resolve())
    }
  }
  return new AddSurveyStub()
}

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[] | null> {
      return mockFakeSurveys()
    }
  }
  return new LoadSurveysStub()
}
