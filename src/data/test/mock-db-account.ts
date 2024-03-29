import { AddAccountRepository } from '@/data/interfaces/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '@/data/interfaces/db/account/load-account-by-email-repository'
import { AccountModel } from '@/domain/models/account'
import { AccountDTO } from '@/domain/usecases/account/add-account'
import { mockAccountModel } from '@/domain/test'
import { LoadAccountByTokenRepository } from '@/data/interfaces/db/account/load-account-by-token'
import { UpdateAccessTokenRepository } from '@/data/interfaces/db/account/update-access-token-repository'

export class AddAccountRepositorySpy implements AddAccountRepository {
  accountModel = mockAccountModel()
  addAccountParams: AccountDTO

  async add (data: AccountDTO): Promise<AccountModel> {
    this.addAccountParams = data
    return this.accountModel
  }
}

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  accountModel = mockAccountModel()
  email: string

  async loadByEmail (email: string): Promise<AccountModel> {
    this.email = email
    return await Promise.resolve(this.accountModel)
  }
}

export class LoadAccountByTokenRepositorySpy implements LoadAccountByTokenRepository {
  accountModel = mockAccountModel()
  token: string
  role: string

  async loadByToken (token: string, role?: string): Promise<AccountModel> {
    this.token = token
    this.role = role
    return await Promise.resolve(this.accountModel)
  }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
  id: string
  token: string

  async updateAccessToken (id: string, token: string): Promise<void> {
    this.id = id
    this.token = token
    return await Promise.resolve()
  }
}
