import { Application } from 'express'

import { indexUsers, showUser } from './users/controller'

const initializeRoutes = (app: Application) => {
  app.get('/status', (request, response) => {
    response.end()
  })

  app.get('/users', indexUsers)
  app.get('/user/:id', showUser)
}

export default initializeRoutes
