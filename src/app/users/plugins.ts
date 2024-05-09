import { FastifyInstance } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import jwt from 'jsonwebtoken'
import prisma from '../../prisma'


export const verifyAuthentication = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('onRequest', async (request, reply) => {
    const token = request.headers.authorization?.replace('Bearer ', '')
    if (!token) return reply.code(401).send()

    const decodedToken = jwt.verify(token, 'your-secret-key') as { userId: number }
    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.userId
      }
    })

    if (user) {
      request.user = user
      return
    }

    reply.code(401).send()
  })
})
