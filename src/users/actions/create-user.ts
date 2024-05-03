import crypto from 'crypto'
import { promisify } from 'util'

import prisma from '../../prisma'

const hashPassword = async (password: string): Promise<string> => {
  const salt = crypto.randomBytes(8).toString('hex')
  const hash = await promisify(crypto.scrypt)(password, salt, 64) as Buffer
  return `${hash.toString('hex')}.${salt}`
}

export default async (email: string, password: string) => {
  const hashedPassword = await hashPassword(password)

  return await prisma.user.create({
    data: {
      email,
      hashedPassword
    }
  })
}
