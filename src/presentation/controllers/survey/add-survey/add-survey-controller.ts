import { BadRequestException } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from './add-survey-controller-interfaces'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return BadRequestException(error)
    }
    return undefined
  }
}
