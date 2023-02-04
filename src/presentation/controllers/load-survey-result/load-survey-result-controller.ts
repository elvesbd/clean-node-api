import { Controller, HttpRequest, HttpResponse, LoadSurveyById, LoadSurveyResult } from './load-survey-result-controller.interface'
import { ForbidenException, Ok, ServerErrorException } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const survey = await this.loadSurveyById.loadById(surveyId)
      if (!survey) {
        return ForbidenException(new InvalidParamError('surveyId'))
      }
      const surveyResult = await this.loadSurveyResult.load(surveyId)
      return Ok(surveyResult)
    } catch (error) {
      return ServerErrorException(error)
    }
  }
}
