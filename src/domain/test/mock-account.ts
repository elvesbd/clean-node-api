import { AccountDTO } from '@/domain/usecases/account/add-account'
import { AccountModel } from '@/domain/models/account'
import { AuthenticationDTO } from '@/domain/usecases/account/authentication'
import { faker } from '@faker-js/faker'

export const mockAddAccountDTO = (): AccountDTO => ({
  name: faker.name.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationParams = (): AuthenticationDTO => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
