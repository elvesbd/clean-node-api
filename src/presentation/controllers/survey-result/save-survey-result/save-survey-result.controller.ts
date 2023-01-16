import { Controller, HttpRequest, HttpResponse, LoadSurveyById, SaveSurveyResult } from './save-survey-result.interface'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { ForbidenException, Ok, ServerErrorException } from '@/presentation/helpers/http/http-helper'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      console.log(httpRequest)
      const { surveyId } = httpRequest.params
      const { answer } = httpRequest.body
      const { accountId } = httpRequest
      console.log('surveyId', surveyId)
      const survey = await this.loadSurveyById.loadById(surveyId)
      console.log('survey', survey)
      if (survey) {
        const answers = survey.answers.map((a) => a.answer)
        if (!answers.includes(answer)) {
          return ForbidenException(new InvalidParamError('answer'))
        }
      } else {
        console.log('caiu no else')
        return ForbidenException(new InvalidParamError('surveyId'))
      }
      const surveyResul = await this.saveSurveyResult.save({
        accountId,
        surveyId,
        answer,
        date: new Date()
      })

      return Ok(surveyResul)
    } catch (error) {
      return ServerErrorException(error)
    }
  }
}
