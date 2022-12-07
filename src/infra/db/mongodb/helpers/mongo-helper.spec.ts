import { MongoHelper as sut } from './mongo-helper'
require('dotenv/config')

describe('Mongo Helpers', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  it('should reconnect is mongodb is down', async () => {
    let accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()

    await sut.disconnect()

    accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })
})
