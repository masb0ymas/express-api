export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  APP_PORT: Number(process.env.APP_PORT) || 8000,
  APP_NAME: process.env.APP_NAME || 'Morphy',
}