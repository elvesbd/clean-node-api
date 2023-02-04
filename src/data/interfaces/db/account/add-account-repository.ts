import { AccountModel } from '@/domain/models/account'
import { AccountDTO } from '@/domain/usecases/account/add-account'
export interface AddAccountRepository {
  add: (data: AccountDTO) => Promise<AccountModel>

}
