import { adapterRoute } from '@/main/adapters/express-route-adapter'
import { auth } from '@/main/middlewares/admin-auth'
import { Router } from 'express'
import { makeSaveSurveyResultController } from '../factories/controllers/survey/survey-result/save-survey-result-controller-factory'

export default (router: Router): void => {
  console.log(router)
  router.put('/surveys/:surveyId/results', auth, adapterRoute(makeSaveSurveyResultController()))
}
