import { AccountDTO, AccountModel } from '../../../usecases/add-account/db-add-account-interfaces'

export interface AddAccountRepository {
  add: (accountData: AccountDTO) => Promise<AccountModel>
}
