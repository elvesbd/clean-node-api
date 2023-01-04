import { LoadSurveysController } from './load-surveys-controller'
import { LoadSurveys, SurveyModel } from './load-surveys-controller.interfaces'
import MockDate from 'mockdate'
import { NoContent, Ok, ServerErrorException } from '@/presentation/helpers/http/http-helper'

interface SutTypes {
  sut: LoadSurveysController
  loadSurveyStub: LoadSurveys
}

const makeFakeSurveys = (): SurveyModel[] => {
  return [
    {
      id: 'any_id',
      question: 'any_question',
      answers: [
        {
          image: 'any_image',
          answer: 'any_answer'
        }
      ],
      date: new Date()
    },
    {
      id: 'other_id',
      question: 'other_question',
      answers: [
        {
          image: 'any_image',
          answer: 'any_answer'
        }
      ],
      date: new Date()
    }
  ]
}

const makeLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[] | null> {
      return makeFakeSurveys()
    }
  }
  return new LoadSurveysStub()
}

const makeSut = (): SutTypes => {
  const loadSurveyStub = makeLoadSurveys()
  const sut = new LoadSurveysController(loadSurveyStub)
  return {
    sut,
    loadSurveyStub
  }
}

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('should call LoadSurveys', async () => {
    const { sut, loadSurveyStub } = makeSut()

    const loadSpy = jest.spyOn(loadSurveyStub, 'load')
    await sut.handle({})

    expect(loadSpy).toHaveBeenCalled()
  })

  it('should return 200 on sucess', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(Ok(makeFakeSurveys()))
  })

  it('should return 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveyStub } = makeSut()

    jest.spyOn(loadSurveyStub, 'load').mockResolvedValueOnce([])
    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(NoContent())
  })

  it('should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveyStub } = makeSut()

    jest.spyOn(loadSurveyStub, 'load').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(ServerErrorException(new Error()))
  })
})
