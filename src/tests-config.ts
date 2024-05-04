import prismaClient from './prisma'
import { Prisma } from '@prisma/client'

export const resetDatabase = async () => {
  const tableNames = Object.values(Prisma.ModelName)

  for (const tableName of tableNames) {
    await prismaClient.$queryRawUnsafe(`TRUNCATE TABLE "${tableName}" RESTART IDENTITY CASCADE`)
  }
}
