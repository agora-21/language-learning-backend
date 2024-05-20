import prisma from '../../../prisma'
import { $Enums } from '@prisma/client'

export default ({ difficulty }: { difficulty: $Enums.Difficulty }) => prisma.lesson.findMany({
  where: {
    difficulty
  }
})
