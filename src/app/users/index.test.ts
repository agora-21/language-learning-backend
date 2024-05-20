import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { resetDatabase } from '../../tests-config'
import Fastify, { FastifyInstance } from 'fastify'
import userApp from '.'
import prisma from '../../prisma'
import crypto from 'crypto'
import { promisify } from 'util'
import jwt from 'jsonwebtoken'

let app : FastifyInstance

const buildApp = () => {
  app = Fastify()
  app.register(userApp)
  return app
}

describe('users routes', () => {
  beforeEach(() => {
    buildApp()
  })

  afterEach(async () => {
    await resetDatabase()
    app.close()
  })

  describe('POST /', () => {
    test('it creates a user', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/',
        payload: {
          email: 'user@test.com',
          password: 'abc123'
        }
      })

      const user = await prisma.user.findUnique({
        where: {
          email: 'user@test.com'
        }
      })

      expect(response.statusCode).toEqual(201)
      expect(user).toBeTruthy()

      if (!user) return

      const [hashedPassword, salt] = user.hashedPassword.split('.')
      const enteredHashedBuffer = await promisify(crypto.scrypt)('abc123', salt, 64) as Buffer
      expect(hashedPassword).toEqual(enteredHashedBuffer.toString('hex'))
    })
  })

  describe('GET /authenticate', () => {
    test('it returns a jwt token', async () => {
      const salt = crypto.randomBytes(8).toString('hex')
      const hash = await promisify(crypto.scrypt)('abc123', salt, 64) as Buffer
      const hashedPassword = `${hash.toString('hex')}.${salt}`

      const user = await prisma.user.create({
        data: {
          email: 'user@test.com',
          hashedPassword
        }
      })

      const response = await app.inject({
        method: 'GET',
        url: '/authenticate',
        query: {
          email: 'user@test.com',
          password: 'abc123'
        }
      })

      const authenticationToken = jwt.sign({ userId: user.id }, 'your-secret-key', {
        expiresIn: '7d'
      })
      expect(response.statusCode).toEqual(200)
      expect(response.body).toEqual(JSON.stringify({
        authenticationToken
      }))
    })
  })
})
