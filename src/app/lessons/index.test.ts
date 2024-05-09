import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { resetDatabase } from '../../tests-config'
import Fastify from 'fastify'
import lessonApp from '.'
import prisma from '../../prisma'

const buildApp = () => {
  const app = Fastify()
  app.register(lessonApp)
  return app
}

describe.skip('lessons routes', () => {
  beforeEach(resetDatabase)
  afterEach(resetDatabase)

  describe('GET /', () => {
    test('it returns all lessons', async () => {
      const app = buildApp()

      await prisma.lesson.create({
        data: {
          name: 'English'
        }
      })
      await prisma.lesson.create({
        data: {
          name: 'Italian'
        }
      })
      await prisma.lesson.create({
        data: {
          name: 'Dutch'
        }
      })

      const response = await app.inject({
        method: 'GET',
        url: '/'
      })

      expect(response.statusCode).toEqual(200)
      expect(response.body).toEqual(JSON.stringify([{
        name: 'English'
      }, {
        name: 'Italian'
      }, {
        name: 'Dutch'
      }]))
    })
  })

  describe('POST /', () => {
    test('it creates a lesson', async () => {
      const app = buildApp()

      const response = await app.inject({
        method: 'POST',
        url: '/',
        payload: {
          name: 'English'
        }
      })

      const lesson = await prisma.lesson.findUnique({
        where: {
          name: 'English'
        }
      })

      expect(response.statusCode).toEqual(201)
      expect(response.body).toEqual(JSON.stringify({
        id: 1,
        name: 'English'
      }))
      expect(lesson).toBeTruthy()
    })

    describe('when name is blank', () => {
      test('it replies with 400', async () => {
        const app = buildApp()

        const response = await app.inject({
          method: 'POST',
          url: '/',
          payload: {
            name: ''
          }
        })

        expect(response.statusCode).toEqual(400)
      })
    })
  })
})
