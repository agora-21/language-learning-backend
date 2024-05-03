import { Application } from 'express'

import { createUser, authenticateUser } from './users/controller'

const initializeRoutes = (app: Application) => {
  app.get('/status', (request, response) => {
    response.end()
  })

  app.post('/users', createUser)
  app.get('/users/authenticate', authenticateUser)
}

export default initializeRoutes
