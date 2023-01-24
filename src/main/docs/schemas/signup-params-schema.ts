export const signUpParamsSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    passwordConfirmation: {
      type: 'string'
    }
  },
  required: ['email', 'password', 'name', 'passwordConfirmation']
}
