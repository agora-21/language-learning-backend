import { FastifyRequest, FastifyReply } from 'fastify'

import createUserService from './services/create-user'
import authenticateUserService from './services/authenticate-user'

interface UserRequest {
  email: string,
  password: string
}

export const createUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const { email, password } = request.body as UserRequest
  await createUserService(email, password)

  reply.code(201).send()
}

export const authenticateUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const { email, password } = request.body as UserRequest
  const authenticationToken = await authenticateUserService(email, password)

  if (authenticationToken) return reply.send({ authenticationToken })

  reply.code(401).send()
}
