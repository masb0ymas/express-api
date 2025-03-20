import { NextFunction, Request, Response } from 'express'
import WithState from '~/lib/module/withState'

export default function expressWithState() {
  return function (req: Request, _res: Response, next: NextFunction) {
    new WithState(req)
    next()
  }
}
