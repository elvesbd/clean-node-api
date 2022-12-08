import { Controller, HttpRequest, HttpResponse, Validation } from './add-survey-controller-interfaces'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    return undefined
  }
}
