import prisma from '../../../prisma'

export default (name: string) => prisma.lesson.create({
  data: {
    name
  }
})
