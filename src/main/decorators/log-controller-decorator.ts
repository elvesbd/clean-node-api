import { LogErrorRepository } from '../../data/interfaces/db/log/log-error-repository'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/interfaces'

export class LogControllerDecorator implements Controller {
  constructor (
    private readonly controller: Controller,
    private readonly LogErrorRepository: LogErrorRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)

    if (httpResponse.statusCode === 500) {
      await this.LogErrorRepository.logError(httpResponse.body.stack)
    }

    return httpResponse
  }
}
