import { Controller, HttpRequest, HttpResponse, LoadSurveyById } from './save-survey-result.interface'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { ForbidenException, ServerErrorException } from '@/presentation/helpers/http/http-helper'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const survey = await this.loadSurveyById.loadById(httpRequest.params.surveyId)
      if (!survey) {
        return ForbidenException(new InvalidParamError('surveyId'))
      }
    } catch (error) {
      return ServerErrorException(error)
    }
  }
}
