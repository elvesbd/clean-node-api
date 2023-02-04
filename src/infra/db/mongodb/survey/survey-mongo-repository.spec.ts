import { SurveyMongoRepository } from './survey-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'
import { mockAddSurveyData } from '@/domain/test'
require('dotenv/config')

let surveyCollection: Collection

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}

describe('SurveyMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  describe('add()', () => {
    it('should add a survey on success', async () => {
      const sut = makeSut()

      await sut.add(mockAddSurveyData())
      const count = await surveyCollection.countDocuments()

      expect(count).toBe(1)
    })
  })

  describe('loadAll()', () => {
    it('should load all surveys on success', async () => {
      const addSurveyModels = [mockAddSurveyData(), mockAddSurveyData()]
      await surveyCollection.insertMany(addSurveyModels)

      const sut = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(2)
      expect(surveys).toBeInstanceOf(Array)
      expect(surveys[0].id).toBeTruthy()
      expect(surveys[0].question).toBe(addSurveyModels[0].question)
      expect(surveys[1].question).toBe(addSurveyModels[1].question)
    })

    it('should load empty list', async () => {
      const sut = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(0)
      expect(surveys).toBeInstanceOf(Array)
    })
  })

  describe('loadById()', () => {
    it('should load survey by id on success', async () => {
      const result = await surveyCollection.insertOne(mockAddSurveyData())
      const sut = makeSut()

      const survey = await sut.loadById(result.insertedId.toString())

      expect(survey.id).toBeTruthy()
      expect(survey).toBeTruthy()
    })
  })
})
