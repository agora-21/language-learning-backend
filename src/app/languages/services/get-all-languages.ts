import prisma from '../../../prisma'

export default () => prisma.language.findMany()
