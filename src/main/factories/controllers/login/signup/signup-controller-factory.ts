
import { SignupController } from '../../../../../presentation/controllers/login/signup/signup-controller'
import { Controller } from '../../../../../presentation/interfaces'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeDbAddAccount } from '../../../usecases/account/add-account/db-add-account'
import { makeDbAuthentication } from '../../../usecases/authentication/db-authentication-factory'
import { makeSignupValidation } from './signup-validation-factory'

export const makeSignupController = (): Controller => {
  const controller = new SignupController(makeDbAddAccount(), makeSignupValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
