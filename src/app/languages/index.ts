import { FastifyInstance } from 'fastify'

import {
  getAllLanguages,
  getAllLanguagesOptions,
  createLanguage,
  createLanguageOptions
} from './controller'

export default async (app: FastifyInstance) => {
  app.get('/', getAllLanguagesOptions, getAllLanguages)
  app.post('/', createLanguageOptions, createLanguage)
}
