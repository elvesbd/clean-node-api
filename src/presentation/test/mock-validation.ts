import { Validation } from '@/presentation/interfaces'

export const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | undefined {
      return null as any
    }
  }
  return new ValidationStub()
}
