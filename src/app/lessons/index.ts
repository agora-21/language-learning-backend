import { FastifyInstance } from 'fastify'

import {
  getAllLessons,
  getAllLessonsOptions,
  createLesson,
  createLessonOptions
} from './controller'

export default async (app: FastifyInstance) => {
  app.get('/', getAllLessonsOptions, getAllLessons)
  app.post('/', createLessonOptions, createLesson)
}
