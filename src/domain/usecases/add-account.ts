import { AccountModel } from '@/domain/models/account'

export interface AccountDTO {
  name: string
  email: string
  password: string
}

export interface AddAccount {
  add: (account: AccountDTO) => Promise<AccountModel | null>
}
