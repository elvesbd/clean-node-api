import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return 'hash'
  },

  async compare (): Promise<boolean> {
    return true
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  describe('hash()', () => {
    it('should call hash with correct values', async () => {
      const sut = makeSut()

      const hashSpy = jest.spyOn(bcrypt, 'hash')

      await sut.hash('any_value')
      expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
      expect(hashSpy).toHaveBeenCalledTimes(1)
    })

    it('should return a valid hash on hash success', async () => {
      const sut = makeSut()

      const hash = await sut.hash('any_value')
      expect(hash).toBe('hash')
      expect(hash).toBeDefined()
      expect(typeof hash).toBe('string')
    })

    it('should throw if hash throws', async () => {
      const sut = makeSut()

      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
        throw new Error()
      })

      const promise = sut.hash('any_value')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('compare()', () => {
    it('should call compare with correct values', async () => {
      const sut = makeSut()

      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare('any_value', 'any_hash')

      expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
      expect(compareSpy).toHaveBeenCalledTimes(1)
    })

    it('should return false when compare fails', async () => {
      const sut = makeSut()

      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => { return false })
      const isValid = await sut.compare('any_value', 'any_hash')

      expect(isValid).toBe(false)
    })

    it('should throw if compare throws', async () => {
      const sut = makeSut()

      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
        throw new Error()
      })

      const promise = sut.compare('any_value', 'any_hash')
      await expect(promise).rejects.toThrow()
    })
  })
})
