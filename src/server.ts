import build from './app'

const app = build({
  logger: true
})

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
