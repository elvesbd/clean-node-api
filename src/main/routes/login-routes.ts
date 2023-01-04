import { adapterRoute } from '@/main/adapters/express-route-adapter'
import { makeLoginController } from '@/main/factories/controllers/login/login/login-controller-factory'
import { makeSignupController } from '@/main/factories/controllers/login/signup/signup-controller-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adapterRoute(makeSignupController()))
  router.post('/login', adapterRoute(makeLoginController()))
}
