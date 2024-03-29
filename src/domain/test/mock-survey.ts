import { SurveyModel } from '@/domain/models/survey'
import { AddSurveyDTO } from '@/domain/usecases/survey/add-survey'
import { faker } from '@faker-js/faker'

export const mockSurveyModel = (): SurveyModel => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(),
  answers: [
    {
      answer: faker.random.word()
    },
    {
      answer: faker.random.word(),
      image: faker.image.imageUrl()
    }
  ],
  date: faker.date.recent()
})

export const mockSurveyModels = (): SurveyModel[] => [
  mockSurveyModel(),
  mockSurveyModel()
]

export const mockAddSurveyData = (): AddSurveyDTO => ({
  question: faker.random.words(),
  answers: [{
    image: faker.image.imageUrl(),
    answer: faker.random.word()
  }],
  date: faker.date.recent()
})
