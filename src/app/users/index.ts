import { FastifyInstance } from 'fastify'

import { createUser, authenticateUser } from './controller'

export default async (app: FastifyInstance) => {
  app.post('/', createUser)
  app.get('/authenticate', authenticateUser)
}
