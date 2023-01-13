
import { MongoHelper } from '../helpers/mongo-helper'
import { AddAccountRepository } from '@/data/interfaces/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '@/data/interfaces/db/account/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '@/data/interfaces/db/account/update-access-token-repository'
import { LoadAccountByTokenRepository } from '@/data/interfaces/db/account/load-account-by-token'
import { AccountModel } from '@/domain/models/account'
import { AccountDTO } from '@/domain/usecases/account/add-account'

export class AccountMongoRepository implements
  AddAccountRepository,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
   LoadAccountByTokenRepository {
  async add (accountData: AccountDTO): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const account = await accountCollection.findOne(result.insertedId)
    return MongoHelper.map(account)
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      _id: MongoHelper.parseIdToObjectId(id)
    }, {
      $set: {
        accessToken: token
      }
    })
  }

  async loadByToken (token: string, role?: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      accessToken: token,
      $or: [{
        role
      }, {
        role: 'admin'
      }]
    })
    return account && MongoHelper.map(account)
  }
}
