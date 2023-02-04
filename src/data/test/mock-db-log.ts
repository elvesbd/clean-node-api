import { LogErrorRepository } from '@/data/interfaces/db/log/log-error-repository'

/* export const mockLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError (stack: string): Promise<void> {
      return await Promise.resolve()
    }
  }

  return new LogErrorRepositoryStub()
} */

export class LogErrorRepositorySpy implements LogErrorRepository {
  stack: string

  async logError (stack: string): Promise<void> {
    this.stack = stack
    return await Promise.resolve()
  }
}
