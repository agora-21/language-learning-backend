import { FastifyRequest, FastifyReply } from 'fastify'

import getAllLessonsService from './services/get-all-lessons'
import createLessonService from './services/create-lesson'

export const getAllLessonsOptions = {
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

export const getAllLessons = async (request: FastifyRequest, reply: FastifyReply) => {
  const lessons = await getAllLessonsService()

  reply.code(200).send(lessons)
}

export const createLessonOptions = {
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

interface CreateLessonRequest {
  name: string
}

export const createLesson = async (request: FastifyRequest, reply: FastifyReply) => {
  const { name } = request.body as CreateLessonRequest

  if (!name) return reply.code(400).send()

  const lesson = await createLessonService(name)
  reply.code(201).send(lesson)
}
