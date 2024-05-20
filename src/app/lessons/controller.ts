import { FastifyRequest, FastifyReply } from 'fastify'
import { $Enums } from '@prisma/client'

import getAllLessonsService from './services/get-all-lessons'
import createLessonService from './services/create-lesson'

export const getAllLessonsOptions = {
  schema: {
    query: {
      type: 'object',
      properties: {
        difficulty: {
          type: 'string'
        }
      }
    },
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'number'
            },
            name: {
              type: 'string'
            },
            description: {
              type: 'string'
            },
            difficulty: {
              type: 'string'
            }
          }
        }
      }
    }
  }
}

type GetAllLessonsRequest = FastifyRequest<{
  Querystring: { difficulty: $Enums.Difficulty }
}>

export const getAllLessons = async (request: GetAllLessonsRequest, reply: FastifyReply) => {
  const lessons = await getAllLessonsService({
    difficulty: request.query.difficulty
  })

  reply.code(200).send(lessons)
}

type CreateLessonRequest = {
  name: string
}

export const createLesson = async (request: FastifyRequest, reply: FastifyReply) => {
  const { name } = request.body as CreateLessonRequest

  if (!name) return reply.code(400).send()

  await createLessonService(name)
  reply.code(201)
}
