import { DbAddAccount } from './db-add-account'
import { AccountDTO, AccountModel, AddAccountRepository, Hasher, LoadAccountByEmailRepository } from './db-add-account-interfaces'

interface SutTypes {
  sut: DbAddAccount
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeFakeAccountData = (): AccountDTO => ({
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
})

const makeHash = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return 'hashed_password'
    }
  }
  return new HasherStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AccountDTO): Promise<AccountModel> {
      return makeFakeAccount()
    }
  }
  return new AddAccountRepositoryStub()
}

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel | null> {
      return null
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const hasherStub = makeHash()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub)

  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub
  }
}

describe('DbAddAccount Usecase', () => {
  it('should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut()

    const hashSpy = jest.spyOn(hasherStub, 'hash')

    await sut.add(makeFakeAccountData())
    expect(hashSpy).toHaveBeenCalledWith('valid_password')
  })

  it('should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()

    jest.spyOn(hasherStub, 'hash').mockRejectedValueOnce(new Error())

    const promise = sut.add(makeFakeAccountData())
    await expect(promise).rejects.toThrow()
  })

  it('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()

    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')

    await sut.add(makeFakeAccountData())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })
  })

  it('should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()

    jest.spyOn(addAccountRepositoryStub, 'add').mockRejectedValueOnce(new Error())

    const promise = sut.add(makeFakeAccountData())
    await expect(promise).rejects.toThrow()
  })

  it('should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(makeFakeAccountData())
    expect(account).toEqual(makeFakeAccount())
  })

  it('should return null if LoadAccountByEmailRepository not return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()

    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockResolvedValueOnce(makeFakeAccount())

    const account = await sut.add(makeFakeAccountData())
    expect(account).toBeNull()
  })

  it('should call LoadAccountByEmailRepository', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()

    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')

    await sut.add(makeFakeAccountData())
    expect(loadSpy).toHaveBeenCalledWith('valid_email@mail.com')
  })
})
