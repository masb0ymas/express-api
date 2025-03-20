import compression from 'compression'
import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import helmet from 'helmet'
import path from 'path'
import { pinoHttp } from 'pino-http'
import expressErrorHandle from '~/app/middleware/errorHandle'
import expressErrorValidation from '~/app/middleware/errorValidation'
import expressRateLimit from '~/app/middleware/rateLimit'
import expressWithState from '~/app/middleware/withState'
import { Route } from '~/app/routes/route'
import ErrorResponse from '~/lib/http/errors'
import { __dirname } from '~/lib/string'
import { httpLogger } from './logger'

export class App {
  private _app: Application

  constructor() {
    this._app = express()
    this._plugins()
    this._routes()
  }

  private _plugins() {
    this._app.use(httpLogger)
    this._app.use(express.json({ limit: '20mb', type: 'application/json' }))
    this._app.use(express.urlencoded({ extended: true }))
    this._app.use(express.static(path.resolve(`${__dirname}/public`)))
    this._app.use(compression())
    this._app.use(helmet())
    this._app.use(cors())

    this._app.use(expressRateLimit())
    this._app.use(expressWithState())
  }

  private _routes() {
    this._app.use(Route)

    // Catch error 404 endpoint not found
    this._app.use('*', (req: Request, _res: Response) => {
      const method = req.method
      const url = req.originalUrl
      const host = req.hostname

      const endpoint = `${host}${url}`

      throw new ErrorResponse.NotFound(
        `Sorry, the ${endpoint} HTTP method ${method} resource you are looking for was not found.`
      )
    })
  }

  public get create() {
    // @ts-expect-error
    this._app.use(expressErrorValidation)

    // @ts-expect-error
    this._app.use(expressErrorHandle)

    return this._app
  }
}
