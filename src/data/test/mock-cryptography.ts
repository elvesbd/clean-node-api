import { Hasher } from '@/data/interfaces/cryptography/hasher'
import { Decrypter } from '@/data/interfaces/cryptography/decrypter'
import { Encrypter } from '@/data/interfaces/cryptography/encrypter'
import { HashComparer } from '@/data/interfaces/cryptography/hashcomparer'

export const mockHash = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return 'any_password'
    }
  }
  return new HasherStub()
}

export const mockDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string | null> {
      return 'any_value'
    }
  }
  return new DecrypterStub()
}

export const mockEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return 'any_token'
    }
  }
  return new EncrypterStub()
}

export const mockHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return true
    }
  }
  return new HashComparerStub()
}
