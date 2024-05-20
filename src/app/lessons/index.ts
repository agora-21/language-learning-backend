import { FastifyInstance } from 'fastify'

import {
  getAllLessons,
  getAllLessonsOptions,
  createLesson
} from './controller'

export default async (app: FastifyInstance) => {
  app.get('/', getAllLessonsOptions, getAllLessons)
  app.post('/', createLesson)
}
