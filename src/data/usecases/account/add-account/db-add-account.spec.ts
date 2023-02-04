import { mockAddAccountDTO, mockAccountModel } from '@/domain/test'
import { DbAddAccount } from './db-add-account'
import { AddAccountRepositorySpy, LoadAccountByEmailRepositorySpy, HasherSpy } from '@/data/test'

interface SutTypes {
  sut: DbAddAccount
  hasherSpy: HasherSpy
  addAccountRepositorySpy: AddAccountRepositorySpy
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  loadAccountByEmailRepositorySpy.accountModel = null
  const hasherSpy = new HasherSpy()
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const sut = new DbAddAccount(hasherSpy, addAccountRepositorySpy, loadAccountByEmailRepositorySpy)

  return {
    sut,
    hasherSpy,
    addAccountRepositorySpy,
    loadAccountByEmailRepositorySpy
  }
}

describe('DbAddAccount Usecase', () => {
  it('should call Hasher with correct password', async () => {
    const { sut, hasherSpy } = makeSut()
    const addAccountParams = mockAddAccountDTO()
    await sut.add(addAccountParams)
    expect(hasherSpy.plaintext).toBe(addAccountParams.password)
  })

  it('should throw if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut()

    jest.spyOn(hasherSpy, 'hash').mockRejectedValueOnce(new Error())

    const promise = sut.add(mockAddAccountDTO())
    await expect(promise).rejects.toThrow()
  })

  it('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositorySpy, hasherSpy } = makeSut()
    const addAccountParams = mockAddAccountDTO()

    await sut.add(addAccountParams)

    expect(addAccountRepositorySpy.addAccountParams).toEqual({
      name: addAccountParams.name,
      email: addAccountParams.email,
      password: hasherSpy.digest
    })
  })

  it('should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()

    jest.spyOn(addAccountRepositorySpy, 'add').mockRejectedValueOnce(new Error())

    const promise = sut.add(mockAddAccountDTO())
    await expect(promise).rejects.toThrow()
  })

  it('should return an account on success', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    const account = await sut.add(mockAddAccountDTO())
    expect(account).toEqual(addAccountRepositorySpy.accountModel)
  })

  it('should return null if LoadAccountByEmailRepository not return null', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    loadAccountByEmailRepositorySpy.accountModel = mockAccountModel()
    const account = await sut.add(mockAddAccountDTO())
    expect(account).toBeNull()
  })

  it('should call LoadAccountByEmailRepository', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    const addAccountParams = mockAddAccountDTO()
    await sut.add(addAccountParams)
    expect(loadAccountByEmailRepositorySpy.email).toBe(addAccountParams.email)
  })
})
