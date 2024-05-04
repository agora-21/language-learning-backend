import crypto from 'crypto'
import { promisify } from 'util'
import jwt from 'jsonwebtoken'

import prisma from '../../../prisma'

const verifyPassword = async (storedPassword: string, enteredPassword: string): Promise<boolean> => {
  const [hashedPassword, salt] = storedPassword.split('.')
  const enteredHashedBuffer = await promisify(crypto.scrypt)(enteredPassword, salt, 64) as Buffer
  return hashedPassword === enteredHashedBuffer.toString('hex')
}

export default async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (!user) return false

  const passwordVerified = verifyPassword(user.hashedPassword, password)
  if (!passwordVerified) return false

  return jwt.sign({ userId: user.id }, 'your-secret-key', {
    expiresIn: '7d',
  })
}
