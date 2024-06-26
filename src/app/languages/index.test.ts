import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { resetDatabase } from '../../tests-config'
import Fastify, { FastifyInstance } from 'fastify'
import languageApp from '.'
import prisma from '../../prisma'

let app : FastifyInstance

const buildApp = () => {
  app = Fastify()
  app.register(languageApp)
  return app
}

describe('languages routes', () => {
  beforeEach(() => {
    buildApp()
  })

  afterEach(async () => {
    await resetDatabase()
    app.close()
  })

  describe('GET /', () => {
    test('it returns all languages', async () => {
      await prisma.language.create({
        data: {
          name: 'English'
        }
      })
      await prisma.language.create({
        data: {
          name: 'Italian'
        }
      })
      await prisma.language.create({
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
    test('it creates a language', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/',
        payload: {
          name: 'English'
        }
      })

      const language = await prisma.language.findUnique({
        where: {
          name: 'English'
        }
      })

      expect(response.statusCode).toEqual(201)
      expect(response.body).toEqual(JSON.stringify({
        id: 1,
        name: 'English'
      }))
      expect(language).toBeTruthy()
    })

    describe('when name is blank', () => {
      test('it replies with 400', async () => {
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
