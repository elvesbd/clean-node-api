import { LogErrorRepository } from '@/data/interfaces/db/log/log-error-repository'

export class LogErrorRepositorySpy implements LogErrorRepository {
  stack: string

  async logError (stack: string): Promise<void> {
    this.stack = stack
    return await Promise.resolve()
  }
}
