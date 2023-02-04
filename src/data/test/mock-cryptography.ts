import { Hasher } from '@/data/interfaces/cryptography/hasher'
import { Decrypter } from '@/data/interfaces/cryptography/decrypter'
import { Encrypter } from '@/data/interfaces/cryptography/encrypter'
import { HashComparer } from '@/data/interfaces/cryptography/hashcomparer'
import { faker } from '@faker-js/faker'
export class HasherSpy implements Hasher {
  digest = faker.datatype.uuid()
  plaintext: string

  async hash (plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return this.digest
  }
}

/* export const mockDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string | null> {
      return 'any_value'
    }
  }
  return new DecrypterStub()
} */

export class DecrypterSpy implements Decrypter {
  plaintext = faker.internet.password()
  ciphertext: string

  async decrypt (ciphertext: string): Promise<string> {
    this.ciphertext = ciphertext
    return await Promise.resolve(this.plaintext)
  }
}

/* export const mockEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return 'any_token'
    }
  }
  return new EncrypterStub()
} */
export class EncrypterSpy implements Encrypter {
  ciphertext = faker.datatype.uuid()
  plaintext: string

  async encrypt (plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return await Promise.resolve(this.ciphertext)
  }
}

/* export const mockHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return true
    }
  }
  return new HashComparerStub()
} */
export class HashComparerSpy implements HashComparer {
  plaintext: string
  digest: string
  isValid = true

  async compare (plaintext: string, digest: string): Promise<boolean> {
    this.plaintext = plaintext
    this.digest = digest
    return await Promise.resolve(this.isValid)
  }
}
