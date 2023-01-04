import { Encrypter } from '@/data/interfaces/cryptography/encrypter'
import { Decrypter } from '@/data/interfaces/cryptography/decrypter'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    const accessToken = jwt.sign({ id: value }, this.secret)
    return accessToken
  }

  async decrypt (token: string): Promise<string | Object> {
    const value = await jwt.verify(token, this.secret)
    return value
  }
}
