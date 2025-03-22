import express, { Request, Response } from 'express'
import swaggerUI from 'swagger-ui-express'
import { env } from '~/config/env'
import { optionsSwaggerUI, swaggerSpec } from '~/lib/swagger'

const route = express.Router()

function docsSwagger() {
  route.get('/swagger.json', (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })

  route.use('/api-docs', swaggerUI.serve)
  route.get('/api-docs', swaggerUI.setup(swaggerSpec, optionsSwaggerUI))
}

// docs swagger disable for production mode
if (env.NODE_ENV !== 'production') {
  docsSwagger()
}

export { route as v1Route }
