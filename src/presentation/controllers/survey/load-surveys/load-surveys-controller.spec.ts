import { LoadSurveysController } from './load-surveys-controller'
import { LoadSurveys, SurveyModel } from './load-surveys-controller.interfaces'
import MockDate from 'mockdate'

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
})
