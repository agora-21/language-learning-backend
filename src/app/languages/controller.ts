import { FastifyRequest, FastifyReply } from 'fastify'

import getAllLanguagesService from './services/get-all-languages'
import createLanguageService from './services/create-language'

export const getAllLanguagesOptions = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string'
            }
          }
        }
      }
    }
  }
}

export const getAllLanguages = async (request: FastifyRequest, reply: FastifyReply) => {
  const languages = await getAllLanguagesService()

  reply.code(200).send(languages)
}

export const createLanguageOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          name: {
            type: 'string'
          }
        }
      }
    }
  }
}

interface CreateLanguageRequest {
  name: string
}

export const createLanguage = async (request: FastifyRequest, reply: FastifyReply) => {
  const { name } = request.body as CreateLanguageRequest

  if (!name) return reply.code(400).send()

  const language = await createLanguageService(name)
  reply.code(201).send(language)
}
