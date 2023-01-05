import { AccountModel } from '@/domain/models/account'

export type AccountDTO = Omit<AccountModel, 'id'>
export interface AddAccount {
  add: (account: AccountDTO) => Promise<AccountModel | null>
}
