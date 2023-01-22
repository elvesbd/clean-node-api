import setupMiddlewars from './middlewars'
import setupRoutes from './routes'
import setupSwagger from './swagger'
import express from 'express'

const app = express()
setupSwagger(app)
setupMiddlewars(app)
setupRoutes(app)
export default app
