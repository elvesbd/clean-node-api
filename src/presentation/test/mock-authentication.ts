import { AuthenticationDTO, Authentication } from '@/domain/usecases/account/authentication'
import { faker } from '@faker-js/faker'
import { AuthenticationModel } from '@/domain/models/authentication'

export class AuthenticationSpy implements Authentication {
  authenticationParams: AuthenticationDTO
  authenticationModel = {
    accessToken: faker.datatype.uuid(),
    name: faker.name.fullName()
  }

  async auth (authenticationParams: AuthenticationDTO): Promise<AuthenticationModel> {
    this.authenticationParams = authenticationParams
    return this.authenticationModel
  }
}
