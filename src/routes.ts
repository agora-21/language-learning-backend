import { FastifyInstance } from 'fastify'

import { createUser, authenticateUser } from './users/controller'

const routes = async (app: FastifyInstance) => {
  app.get('/status', (_, reply) => reply.send())

  app.post('/users', createUser)
  app.get('/users/authenticate', authenticateUser)
}

export default routes
