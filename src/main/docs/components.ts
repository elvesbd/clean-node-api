import { badRequest, unauthorized, serverError, notFound, forbidden } from './components/'
import { apiKeyAuthSchema } from './schemas/'

export default {
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    badRequest,
    unauthorized,
    serverError,
    notFound,
    forbidden
  }
}
