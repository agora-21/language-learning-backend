import { FastifyRequest, FastifyReply } from 'fastify'

import getAllLanguagesService from './services/get-all-languages'

export const getAllLanguages = async (request: FastifyRequest, reply: FastifyReply) => {
  const languages = await getAllLanguagesService()

  reply.code(200).send(languages)
}
