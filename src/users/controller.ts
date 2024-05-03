import { Request, Response } from 'express'
import createUserService from './actions/create-user'
import authenticateUserService from './actions/authenticate-user'

interface UserRequest {
  email: string,
  password: string
}

export const createUser = async (request: Request, response: Response) => {
  const { email, password } = request.body as UserRequest
  await createUserService(email, password)

  response.status(201)
}

export const authenticateUser = async (request: Request, response: Response) => {
  const { email, password } = request.body as UserRequest
  const authenticationToken = await authenticateUserService(email, password)

  if (authenticationToken) return response.status(200).json({ authenticationToken })

  response.status(401)
}
