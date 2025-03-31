import 'dotenv/config'
import { validate } from '~/lib/validate'

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  APP_PORT: validate.number(process.env.APP_PORT) || 8000,
  APP_NAME: process.env.APP_NAME || 'Backend',
  APP_URL: process.env.APP_URL || 'http://localhost:8000',
}
