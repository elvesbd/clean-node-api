import setupMiddlewars from './middlewars'
import setupRoutes from './routes'
import setupStaticFiles from './static-files'
import setupSwagger from './swagger'
import express from 'express'

const app = express()
setupStaticFiles(app)
setupSwagger(app)
setupMiddlewars(app)
setupRoutes(app)
export default app
