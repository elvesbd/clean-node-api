import bcrypt from 'bcrypt'
import { HashComparer } from '../../../data/interfaces/cryptography/hashcomparer'
import { Hasher } from '../../../data/interfaces/cryptography/hasher'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor (private readonly salt: number) {}

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }

  async compare (value: string, hash: string): Promise<boolean> {
    const compare = await bcrypt.compare(value, hash)
    return compare
  }
}
