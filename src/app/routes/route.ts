import express, { Request, Response } from 'express'
import { asyncHandler } from '~/lib/asyncHandler'
import HttpResponse from '~/lib/http/response'
import { __dirname, require } from '~/lib/string'

const route = express.Router()

function versioning() {
  const node_modules = `${__dirname}/node_modules`
  const express = require(`${node_modules}/express/package.json`).version
  const app = require(`${__dirname}/package.json`).version

  return { express: `v${express}`, app: `v${app}` }
}

route.get(
  '/',
  asyncHandler((_req: Request, res: Response) => {
    const httpResponse = HttpResponse.get({ data: 'Hello World!' })
    res.status(200).json(httpResponse)
  })
)

route.get(
  '/health',
  asyncHandler((_req: Request, res: Response) => {
    const startUsage = process.cpuUsage()
    const version = versioning()

    const status = {
      date: new Date().toISOString(),
      node: process.version,
      express: version.express,
      api: version.app,
      platform: process.platform,
      uptime: process.uptime(),
      cpu_usage: process.cpuUsage(startUsage),
      memory: process.memoryUsage(),
    }

    const httpResponse = HttpResponse.get({ data: status })
    res.status(200).json(httpResponse)
  })
)

export { route as Route }
