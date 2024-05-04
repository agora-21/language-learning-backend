import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { resetDatabase } from '../../tests-config'
import Fastify from 'fastify'
import userApp from '.'

const buildApp = () => {
  const app = Fastify()
  app.register(userApp)
  return app
}

describe('users routes', () => {
  beforeEach(resetDatabase)
  afterEach(resetDatabase)

  describe('POST /', () => {
    test('it creates a user', async () => {
      const app = buildApp()

      const response = await app.inject({
        method: 'POST',
        url: '/',
        payload: {
          email: 'user@test.com',
          password: 'abc123'
        }
      })

      expect(response.statusCode).toEqual(201)
    })
  })
})
