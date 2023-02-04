import { AccountMongoRepository } from './account-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'
import { mockAddAccountDTO } from '@/domain/test'
import { faker } from '@faker-js/faker'
require('dotenv/config')

let accountCollection: Collection

describe('AccountMongoRepository', () => {
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
      const addAccountParams = mockAddAccountDTO()

      const account = await sut.add(addAccountParams)

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(addAccountParams.name)
      expect(account.email).toBe(addAccountParams.email)
      expect(account.password).toBe(addAccountParams.password)
    })
  })

  describe('LoadByEmail()', () => {
    it('should return an account on LoadByEmail success', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountDTO()
      await accountCollection.insertOne(addAccountParams)

      const account = await sut.loadByEmail(addAccountParams.email)

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(addAccountParams.name)
      expect(account.email).toBe(addAccountParams.email)
      expect(account.password).toBe(addAccountParams.password)
    })

    it('should return null with LoadByEmail fails', async () => {
      const sut = makeSut()

      const account = await sut.loadByEmail(faker.internet.email())

      expect(account).toBeFalsy()
    })
  })

  describe('updateAccessToken()', () => {
    it('should update the account accessToken on success', async () => {
      const sut = makeSut()
      const result = await accountCollection.insertOne(mockAddAccountDTO())
      const id = result.insertedId.toString()
      const accessToken = faker.datatype.uuid()

      await sut.updateAccessToken(id, accessToken)
      const account = await accountCollection.findOne({ _id: result.insertedId })

      expect(account).toBeTruthy()
      expect(account.accessToken).toBe(accessToken)
    })
  })

  describe('LoadByToken()', () => {
    let name = faker.name.fullName()
    let email = faker.internet.email()
    let password = faker.internet.password()
    let accessToken = faker.datatype.uuid()

    beforeEach(() => {
      name = faker.name.fullName()
      email = faker.internet.email()
      password = faker.internet.password()
      accessToken = faker.datatype.uuid()
    })

    it('should return an account on LoadByToken without role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name,
        email,
        password,
        accessToken
      })
      const account = await sut.loadByToken(accessToken)

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(name)
      expect(account.email).toBe(email)
      expect(account.password).toBe(password)
    })

    it('should return an account on LoadByToken with admin role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name,
        email,
        password,
        accessToken,
        role: 'admin'
      })
      const account = await sut.loadByToken(accessToken, 'admin')

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(name)
      expect(account.email).toBe(email)
      expect(account.password).toBe(password)
    })

    it('should return null on LoadByToken with invalid role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name,
        email,
        password,
        accessToken
      })
      const account = await sut.loadByToken(accessToken, 'admin')

      expect(account).toBeFalsy()
    })

    it('should return an account on LoadByToken with if user is admin', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name,
        email,
        password,
        accessToken
      })
      const account = await sut.loadByToken(accessToken)

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(name)
      expect(account.email).toBe(email)
      expect(account.password).toBe(password)
    })

    it('should return null with LoadByToken fails', async () => {
      const sut = makeSut()

      const account = await sut.loadByToken(accessToken)

      expect(account).toBeFalsy()
    })
  })
})
