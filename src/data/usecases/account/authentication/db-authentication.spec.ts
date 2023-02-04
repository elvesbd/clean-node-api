import { LoadAccountByEmailRepositorySpy, HashComparerSpy, EncrypterSpy, UpdateAccessTokenRepositorySpy } from '../../../test'
import { DbAuthentication } from './db-authentication'
import { mockAuthenticationParams } from '@/domain/test'

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
  encrypterSpy: EncrypterSpy
  updateAccessTokenRepositorySpy: UpdateAccessTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const encrypterSpy = new EncrypterSpy()
  const updateAccessTokenRepositorySpy = new UpdateAccessTokenRepositorySpy()
  const sut = new DbAuthentication(
    loadAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
    updateAccessTokenRepositorySpy
  )
  return {
    sut,
    loadAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
    updateAccessTokenRepositorySpy
  }
}

describe('DbAuthentication UseCase', () => {
  it('should call LoadAccountByEmailRepository', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(loadAccountByEmailRepositorySpy.email).toBe(authenticationParams.email)
  })

  it('should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()

    jest.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail').mockRejectedValueOnce(new Error())

    await expect(sut.auth(mockAuthenticationParams())).rejects.toThrow()

    /* const promise = sut.auth(mockAuthenticationParams())
    console.log(promise)
    await expect(promise).rejects.toThrow() */
  })

  it('should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()

    jest.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail').mockResolvedValueOnce(null)

    const accessToken = await sut.auth(mockAuthenticationParams())
    expect(accessToken).toBeNull()
  })

  it('should call HashComparer with correct values', async () => {
    const { sut, hashComparerSpy, loadAccountByEmailRepositorySpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()

    await sut.auth(authenticationParams)

    expect(hashComparerSpy.plaintext).toBe(authenticationParams.password)
    expect(hashComparerSpy.digest).toBe(loadAccountByEmailRepositorySpy.accountModel.password)
  })

  it('should throw if HashComparer throws', async () => {
    const { sut, hashComparerSpy } = makeSut()

    jest.spyOn(hashComparerSpy, 'compare').mockRejectedValueOnce(new Error())

    await expect(sut.auth(mockAuthenticationParams())).rejects.toThrow()

    /* const promise = sut.auth(mockAuthenticationParams())
    console.log(promise)
    await expect(promise).rejects.toThrow() */
  })

  it('should return null if HashComparer returns false', async () => {
    const { sut, hashComparerSpy } = makeSut()

    hashComparerSpy.isValid = false
    const accessToken = await sut.auth(mockAuthenticationParams())

    expect(accessToken).toBeNull()
  })

  it('should call Encrypter with correct id', async () => {
    const { sut, encrypterSpy, loadAccountByEmailRepositorySpy } = makeSut()

    await sut.auth(mockAuthenticationParams())

    expect(encrypterSpy.plaintext).toBe(loadAccountByEmailRepositorySpy.accountModel.id)
  })

  it('should throw if Encrypter throws', async () => {
    const { sut, encrypterSpy } = makeSut()

    jest.spyOn(encrypterSpy, 'encrypt').mockRejectedValueOnce(new Error())

    await expect(sut.auth(mockAuthenticationParams())).rejects.toThrow()

    /* const promise = sut.auth(mockAuthenticationParams())
    console.log(promise)
    await expect(promise).rejects.toThrow() */
  })

  it('should call Encrypter with correct values', async () => {
    const { sut, encrypterSpy } = makeSut()

    const accessToken = await sut.auth(mockAuthenticationParams())

    expect(accessToken).toBe(encrypterSpy.ciphertext)
  })

  it('should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositorySpy, loadAccountByEmailRepositorySpy, encrypterSpy } = makeSut()

    await sut.auth(mockAuthenticationParams())

    expect(updateAccessTokenRepositorySpy.id).toBe(loadAccountByEmailRepositorySpy.accountModel.id)
    expect(updateAccessTokenRepositorySpy.token).toBe(encrypterSpy.ciphertext)
  })

  it('should throw if UpdateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositorySpy } = makeSut()

    jest.spyOn(updateAccessTokenRepositorySpy, 'updateAccessToken').mockRejectedValueOnce(new Error())

    await expect(sut.auth(mockAuthenticationParams())).rejects.toThrow()

    /* const promise = sut.auth(mockAuthenticationParams())
    console.log(promise)
    await expect(promise).rejects.toThrow() */
  })
})
