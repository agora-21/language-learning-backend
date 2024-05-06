import { FastifyInstance } from 'fastify'

import { getAllLanguages } from './controller'

const getAllLanguagesOptions = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string' }
          }
        }
      }
    }
  }
}

export default async (app: FastifyInstance) => {
  app.get('/', getAllLanguagesOptions, getAllLanguages)
}
