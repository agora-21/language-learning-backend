import Fastify from 'fastify'

import userRoutes from './users'

export default (options = {}) => {
  const app = Fastify(options)

  app.register(userRoutes, {
    prefix: '/users'
  })

  return app
}
