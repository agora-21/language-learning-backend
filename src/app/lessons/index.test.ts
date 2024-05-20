import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { resetDatabase } from '../../tests-config'
import Fastify, { FastifyInstance } from 'fastify'
import lessonApp from '.'
import prisma from '../../prisma'

let app : FastifyInstance

const buildApp = () => {
  app = Fastify()
  app.register(lessonApp)
  return app
}

describe('lessons routes', () => {
  beforeEach(() => {
    buildApp()
  })

  afterEach(async () => {
    await resetDatabase()
    app.close()
  })

  describe('GET /', () => {
    test('it returns lessons of difficulty A_1', async () => {
      await prisma.lesson.create({
        data: {
          name: 'Casual conversation',
          description: 'Jane and Bert have a conversation during a friends party.',
          difficulty: 'A_1'
        }
      })
      await prisma.lesson.create({
        data: {
          name: 'Formal conversation',
          description: 'Jane and Bert have a conversation during a UN meeting.',
          difficulty: 'A_1'
        }
      })
      await prisma.lesson.create({
        data: {
          name: 'Veterinary appointment',
          description: 'Bens dog Vader gets sick and taken to vet. The veterinarian explains their situation.',
          difficulty: 'B_1'
        }
      })

      const response = await app.inject({
        method: 'GET',
        url: '/',
        query: {
          difficulty: 'A_1'
        }
      })

      expect(response.statusCode).toEqual(200)
      expect(response.body).toEqual(JSON.stringify([{
        id: 1,
        name: 'Casual conversation',
        description: 'Jane and Bert have a conversation during a friends party.',
        difficulty: 'A_1'
      }, {
        id: 2,
        name: 'Formal conversation',
        description: 'Jane and Bert have a conversation during a UN meeting.',
        difficulty: 'A_1'
      }]))
    })

    test('it returns lessons of difficulty B_1', async () => {
      await prisma.lesson.create({
        data: {
          name: 'Casual conversation',
          description: 'Jane and Bert have a conversation during a friends party.',
          difficulty: 'A_1'
        }
      })
      await prisma.lesson.create({
        data: {
          name: 'Formal conversation',
          description: 'Jane and Bert have a conversation during a UN meeting.',
          difficulty: 'A_1'
        }
      })
      await prisma.lesson.create({
        data: {
          name: 'Veterinary appointment',
          description: 'Bens dog Vader gets sick and taken to vet. The veterinarian explains their situation.',
          difficulty: 'B_1'
        }
      })

      const response = await app.inject({
        method: 'GET',
        url: '/',
        query: {
          difficulty: 'B_1'
        }
      })

      expect(response.statusCode).toEqual(200)
      expect(response.body).toEqual(JSON.stringify([{
        id: 3,
        name: 'Veterinary appointment',
        description: 'Bens dog Vader gets sick and taken to vet. The veterinarian explains their situation.',
        difficulty: 'B_1'
      }]))
    })
  })
})
