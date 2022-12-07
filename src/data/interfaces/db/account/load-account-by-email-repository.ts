import { AccountModel } from '../../../usecases/add-account/db-add-account-interfaces'

export interface LoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<AccountModel | null>
}
