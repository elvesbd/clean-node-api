import { SurveyMongoRepository } from './survey-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'
import { mockAddSurveyData, mockAddAccountDTO } from '@/domain/test'
import { AccountModel } from '@/domain/models/account'
require('dotenv/config')

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const mockAccount = async (): Promise<AccountModel> => {
  const res = await accountCollection.insertOne(mockAddAccountDTO())
  const account = await accountCollection.findOne(res.insertedId)
  return MongoHelper.map(account)
}

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

    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await surveyCollection.deleteMany({})

    accountCollection = await MongoHelper.getCollection('account')
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
      const account = await mockAccount()
      const addSurveyModels = [mockAddSurveyData(), mockAddSurveyData()]
      const result = await surveyCollection.insertMany(addSurveyModels)
      const survey = await surveyCollection.findOne(result.insertedIds[0])
      await surveyResultCollection.insertOne({
        surveyId: survey._id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date()
      })

      const sut = makeSut()
      const surveys = await sut.loadAll(account.id)
      expect(surveys.length).toBe(2)
      expect(surveys).toBeInstanceOf(Array)
      expect(surveys[0].id).toBeTruthy()
      expect(surveys[0].question).toBe(addSurveyModels[0].question)
      expect(surveys[0].didAnswer).toBe(true)
      expect(surveys[1].question).toBe(addSurveyModels[1].question)
      expect(surveys[1].didAnswer).toBe(false)
    })

    it('should load empty list', async () => {
      const account = await mockAccount()
      const sut = makeSut()
      const surveys = await sut.loadAll(account.id)
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
