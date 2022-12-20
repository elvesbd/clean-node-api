import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository'
require('dotenv/config')

let accountCollection: Collection

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  describe('add()', () => {
    it('should return an account on add success', async () => {
      const sut = makeSut()
      const account = await sut.add({
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'any_password'
      })

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@gmail.com')
      expect(account.password).toBe('any_password')
    })
  })

  describe('LoadByEmail()', () => {
    it('should return an account on LoadByEmail success', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'any_password'
      })
      const account = await sut.loadByEmail('any_email@gmail.com')

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@gmail.com')
      expect(account.password).toBe('any_password')
    })

    it('should return null with LoadByEmail fails', async () => {
      const sut = makeSut()

      const account = await sut.loadByEmail('any_email@gmail.com')
      expect(account).toBeFalsy()
    })
  })

  describe('updateAccessToken()', () => {
    it('should update the account accessToken on updateAccessToken success', async () => {
      const sut = makeSut()

      const result = await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'any_password'
      })

      const id = result.insertedId.toString()
      await sut.updateAccessToken(id, 'any_token')

      const account = await accountCollection.findOne({ _id: result.insertedId })

      expect(account).toBeDefined()
      expect(account?.accessToken).toBe('any_token')
      expect(account?._id).toEqual(result.insertedId)
    })
  })
})
