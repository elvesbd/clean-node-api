import { SurveyResultModel } from '@/domain/models/survey-result'
import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'
import { mockSurveyModels, mockSurveyModel, mockSurveyResultModel } from '@/domain/test'
import { SaveSurveyResult, SaveSurveyResultDTO } from '@/domain/usecases/survey-result/save-survey-result'
import { AddSurvey, AddSurveyDTO } from '@/domain/usecases/survey/add-survey'
import { LoadSurveys } from '@/domain/usecases/survey/load-surveys'
import { SurveyModel } from '@/domain/models/survey'
import { LoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result'

export class LoadSurveyByIdSpy implements LoadSurveyById {
  surveyModel = mockSurveyModel()
  id: string

  async loadById (id: string): Promise<SurveyModel> {
    this.id = id
    return this.surveyModel
  }
}

export class SaveSurveyResultSpy implements SaveSurveyResult {
  surveyResultModel = mockSurveyResultModel()
  saveSurveyResultParams: SaveSurveyResultDTO

  async save (data: SaveSurveyResultDTO): Promise<SurveyResultModel> {
    this.saveSurveyResultParams = data
    return this.surveyResultModel
  }
}

export class LoadSurveyResultSpy implements LoadSurveyResult {
  surveyResultModel = mockSurveyResultModel()
  surveyId: string
  accountId: string

  async load (surveyId: string, accountId: string): Promise<SurveyResultModel> {
    this.surveyId = surveyId
    this.accountId = accountId
    return this.surveyResultModel
  }
}

export class AddSurveySpy implements AddSurvey {
  addSurveyParams: AddSurveyDTO

  async add (data: AddSurveyDTO): Promise<void> {
    this.addSurveyParams = data
  }
}

export class LoadSurveysSpy implements LoadSurveys {
  surveyModels = mockSurveyModels()
  accountId: string

  async load (accountId: string): Promise<SurveyModel[]> {
    this.accountId = accountId
    return this.surveyModels
  }
}
