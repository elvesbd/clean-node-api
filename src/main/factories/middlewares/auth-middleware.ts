import { makeDbLoadAccountByToken } from '../usecases/load-accoubt-by-token/db-load-account-by-token-factory'
import { Middleware } from '@/presentation/interfaces'
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'

export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role)
}
