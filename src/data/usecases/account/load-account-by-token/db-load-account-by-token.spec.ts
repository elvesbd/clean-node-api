import { DbLoadAccountByToken } from './db-load-account-by-token'
import { DecrypterSpy, LoadAccountByTokenRepositorySpy } from '@/data/test'
import { faker } from '@faker-js/faker'

interface SutTypes {
  sut: DbLoadAccountByToken
  decrypterSpy: DecrypterSpy
  loadAccountByTokenRepositorySpy: LoadAccountByTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy()
  const decrypterSpy = new DecrypterSpy()
  const sut = new DbLoadAccountByToken(decrypterSpy, loadAccountByTokenRepositorySpy)
  return {
    sut,
    decrypterSpy,
    loadAccountByTokenRepositorySpy
  }
}

let token: string
let role: string

describe('DbLoadAccountByToken Usecase', () => {
  beforeEach(() => {
    token = faker.datatype.uuid()
    role = faker.random.word()
  })

  it('Should call Decrypter with correct ciphertext', async () => {
    const { sut, decrypterSpy } = makeSut()
    await sut.load(token, role)
    expect(decrypterSpy.ciphertext).toBe(token)
  })

  it('should return null if Decrypter returns null', async () => {
    const { sut, decrypterSpy } = makeSut()
    decrypterSpy.plaintext = null

    const account = await sut.load(token, role)

    expect(account).toBeNull()
  })

  it('should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()

    await sut.load(token, role)

    expect(loadAccountByTokenRepositorySpy.token).toBe(token)
    expect(loadAccountByTokenRepositorySpy.role).toBe(role)
  })

  it('should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    loadAccountByTokenRepositorySpy.accountModel = null

    const account = await sut.load(token, role)

    expect(account).toBeNull()
  })

  it('should return an account on success', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()

    const account = await sut.load(token, role)

    expect(account).toEqual(loadAccountByTokenRepositorySpy.accountModel)
  })

  it('should throws if Decrypter throws', async () => {
    const { sut, decrypterSpy } = makeSut()

    jest.spyOn(decrypterSpy, 'decrypt').mockRejectedValueOnce(new Error())
    const account = await sut.load('any_token', 'any_role')

    expect(account).toBe(null)
  })

  it('should throws if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()

    jest.spyOn(loadAccountByTokenRepositorySpy, 'loadByToken').mockRejectedValueOnce(new Error())
    const promise = sut.load('any_token', 'any_role')

    await expect(promise).rejects.toThrow()
  })
})
