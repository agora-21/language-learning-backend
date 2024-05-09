import Fastify from 'fastify'

import userRoutes from './users'
import languageRoutes from './languages'
import lessonRoutes from './lessons'

import { verifyAuthentication } from './users/plugins'

export default (options = {}) => {
  const app = Fastify(options)

  app.register(function authenticatedContext (app) {
    app.register(verifyAuthentication)

    app.register(languageRoutes, {
      prefix: '/languages'
    })

    app.register(lessonRoutes, {
      prefix: '/lessons'
    })
  })

  app.register(userRoutes, {
    prefix: '/users'
  })

  return app
}
