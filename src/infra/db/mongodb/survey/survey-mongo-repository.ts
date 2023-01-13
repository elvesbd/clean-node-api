import { MongoHelper } from '../helpers/mongo-helper'
import { AddSurveyRepository } from '@/data/interfaces/db/survey/add-survey-repository'
import { LoadSurveyRepository } from '@/data/interfaces/db/survey/load-survey-repository'
import { AddSurveyModel } from '@/domain/usecases/survey/add-survey'
import { SurveyModel } from '@/domain/models/survey'
import { LoadSurveyByIdRepository } from '@/data/usecases/survey/load-survey-by-id/db-load-survey-by-id.interfaces'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveyRepository, LoadSurveyByIdRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  };

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys = await surveyCollection.find().toArray()
    return MongoHelper.mapCollection(surveys)
  }

  async loadById (id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne<SurveyModel>({ _id: id })
    return survey && MongoHelper.map(survey)
  }
}
