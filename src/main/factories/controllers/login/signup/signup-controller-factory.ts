import { makeSignupValidation } from './signup-validation-factory'
import { makeDbAddAccount } from '@/main/factories/usecases/account/add-account/db-add-account'
import { makeDbAuthentication } from '@/main/factories/usecases/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { SignupController } from '@/presentation/controllers/login/signup/signup-controller'
import { Controller } from '@/presentation/interfaces'

export const makeSignupController = (): Controller => {
  const controller = new SignupController(makeDbAddAccount(), makeSignupValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
