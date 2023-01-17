import { AccountDTO } from '@/domain/usecases/account/add-account'
import { AccountModel } from '@/domain/models/account'
import { AuthenticationDTO } from '@/domain/usecases/account/authentication'

export const mockAddAccountDTO = (): AccountDTO => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

export const mockAccountModel = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

export const mockFakeAuthentication = (): AuthenticationDTO => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})
