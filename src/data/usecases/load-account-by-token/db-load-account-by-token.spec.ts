import { Decrypter } from '../../interfaces/cryptography/decrypter'
import { DbLoadAccountByToken } from './db-load-account-by-token'

describe('DbLoadAccountByToken Usecase', () => {
  it('should call Decrypter with correct values', async () => {
    class DecrypterStub implements Decrypter {
      async decrypt (value: string): Promise<string> {
        return 'any_value'
      }
    }
    const decrypterStub = new DecrypterStub()
    const descrptSpy = jest.spyOn(decrypterStub, 'decrypt')
    const sut = new DbLoadAccountByToken(decrypterStub)
    await sut.load('any_token')
    expect(descrptSpy).toHaveBeenCalledWith('any_token')
  })
})
