import { Router } from 'express'

import { adapterRoute } from '../adapters/express-route-adapter'
import { makeLoginController } from '../factories/controllers/login/login/login-controller-factory'
import { makeSignupController } from '../factories/controllers/login/signup/signup-controller-factory'

export default (router: Router): void => {
  router.post('/signup', adapterRoute(makeSignupController()))
  router.post('/login', adapterRoute(makeLoginController()))
}
