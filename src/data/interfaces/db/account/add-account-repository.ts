import { AccountModel } from '@/domain/models/account'
import { AccountDTO } from '@/domain/usecases/add-account'
export interface AddAccountRepository {
  add: (accountData: AccountDTO) => Promise<AccountModel>
}
