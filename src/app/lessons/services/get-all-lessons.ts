import prisma from '../../../prisma'

export default () => prisma.lesson.findMany()
