export interface AuthenticationDTO {
  email: string
  password: string
}

export interface Authentication {
  auth: (authenticationParams: AuthenticationDTO) => Promise<string>

}
