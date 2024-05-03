import Fastify, { FastifyInstance } from 'fastify'

import routes from './routes'

const app : FastifyInstance = Fastify({
  logger: true
})

app.register(routes)

const startServer = async () => {
  try {
    const port = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 3000

    await app.listen({ port })

    app.log.info(`Server listening on ${app.server.address()}`)
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

startServer()
