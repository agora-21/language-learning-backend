import prisma from '../../../prisma'

export default (name: string) => prisma.language.create({
  data: {
    name
  }
})
