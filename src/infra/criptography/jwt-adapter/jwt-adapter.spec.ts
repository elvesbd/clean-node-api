import { JwtAdapter } from './jwt-adapter'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return 'any_token'
  },
  async verify (): Promise<string> {
    return 'any_value'
  }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}

describe('Jwt Adapter', () => {
  describe('sign()', () => {
    it('should call sign with correct values', async () => {
      const sut = new JwtAdapter('secret')

      const signSpy = jest.spyOn(jwt, 'sign')

      await sut.encrypt('any_id')
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')

      expect(jwt.sign).toBeDefined()
      expect(typeof jwt.sign).toBe('function')
      expect(jwt.sign).toHaveBeenCalledTimes(1)
    })

    it('should return a token on sign success', async () => {
      const sut = makeSut()

      jest.spyOn(jwt, 'sign')

      const accessToken = await sut.encrypt('any_id')
      expect(accessToken).toBeDefined()
      expect(accessToken).toBe('any_token')
      expect(typeof accessToken).toBe('string')

      expect(jwt.sign).toBeDefined()
      expect(typeof jwt.sign).toBe('function')
      expect(jwt.sign).toHaveBeenCalledTimes(2)
      expect(jwt.sign).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
    })

    it('should throw if sign throws', async () => {
      const sut = makeSut()

      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error()
      })

      await expect(sut.encrypt('any_id')).rejects.toThrow()

      expect(jwt.sign).toBeDefined()
      expect(typeof jwt.sign).toBe('function')
      expect(jwt.sign).toHaveBeenCalledTimes(3)
    })
  })

  describe('verify()', () => {
    it('should call verify with correct values', async () => {
      const sut = new JwtAdapter('secret')

      const verifySpy = jest.spyOn(jwt, 'verify')

      await sut.decrypt('any_token')
      expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret')
      expect(jwt.verify).toBeDefined()
      expect(typeof jwt.verify).toBe('function')
      expect(jwt.verify).toHaveBeenCalledTimes(1)
    })

    it('should return a value on verify success', async () => {
      const sut = makeSut()

      jest.spyOn(jwt, 'verify')

      const value = await sut.decrypt('any_token')
      expect(value).toBeDefined()
      expect(value).toBe('any_value')
      expect(typeof value).toBe('string')

      expect(jwt.verify).toBeDefined()
      expect(typeof jwt.verify).toBe('function')
      expect(jwt.verify).toHaveBeenCalledTimes(2)
      expect(jwt.verify).toHaveBeenCalledWith('any_token', 'secret')
    })

    it('should throw if verify throws', async () => {
      const sut = makeSut()

      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
        throw new Error()
      })

      /* await expect(sut.decrypt('any_token')).rejects.toThrow()

      expect(jwt.verify).toBeDefined()
      expect(typeof jwt.verify).toBe('function')
      expect(jwt.verify).toHaveBeenCalledTimes(3) */

      const promise = sut.decrypt('any_token')
      await expect(promise).rejects.toThrow()
    })
  })
})
