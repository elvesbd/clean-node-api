import { BadRequestException, ServerErrorException } from '../../../helpers/http/http-helper'
import { AddSurvey, Controller, HttpRequest, HttpResponse, Validation } from './add-survey-controller-interfaces'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return BadRequestException(error)
      }

      const { answers, question } = httpRequest.body
      await this.addSurvey.add({ answers, question })
      return undefined
    } catch (error) {
      return ServerErrorException(error)
    }
  }
}
