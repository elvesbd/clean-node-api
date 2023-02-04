import { AuthenticationDTO, Authentication } from '@/domain/usecases/account/authentication'
import { faker } from '@faker-js/faker'

export class AuthenticationSpy implements Authentication {
  authenticationParams: AuthenticationDTO
  token = faker.datatype.uuid()

  async auth (authenticationParams: AuthenticationDTO): Promise<string> {
    this.authenticationParams = authenticationParams
    return await Promise.resolve(this.token)
  }
}
