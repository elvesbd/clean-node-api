import setupMiddlewars from './middlewars'
import setupRoutes from './routes'
import express from 'express'

const app = express()
setupMiddlewars(app)
setupRoutes(app)
export default app
