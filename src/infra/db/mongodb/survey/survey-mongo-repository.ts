import { MongoHelper } from '../helpers/mongo-helper'
import { AddSurveyRepository } from '@/data/interfaces/db/survey/add-survey-repository'
import { LoadSurveyRepository } from '@/data/interfaces/db/survey/load-survey-repository'
import { AddSurveyDTO } from '@/domain/usecases/survey/add-survey'
import { SurveyModel } from '@/domain/models/survey'
import { LoadSurveyByIdRepository } from '@/data/usecases/survey/load-survey-by-id/db-load-survey-by-id.interfaces'
import { ObjectId } from 'mongodb'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveyRepository, LoadSurveyByIdRepository {
  async add (data: AddSurveyDTO): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(data)
  };

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys = await surveyCollection.find().toArray()
    return MongoHelper.mapCollection(surveys)
  }

  async loadById (id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne<SurveyModel>({ _id: new ObjectId(id) })
    return survey && MongoHelper.map(survey)
  }
}
