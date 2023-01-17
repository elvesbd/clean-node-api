import { AuthenticationDTO, Authentication } from '@/domain/usecases/account/authentication'

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: AuthenticationDTO): Promise<string | null> {
      return 'token'
    }
  }
  return new AuthenticationStub()
}
