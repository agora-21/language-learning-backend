-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('A_1', 'A_2', 'B_1', 'B_2', 'C_1', 'C_2');

-- CreateTable
CREATE TABLE "Lesson" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LessonParagraph" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,
    "lessonId" INTEGER NOT NULL,

    CONSTRAINT "LessonParagraph_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LessonParagraph_number_languageId_lessonId_key" ON "LessonParagraph"("number", "languageId", "lessonId");

-- AddForeignKey
ALTER TABLE "LessonParagraph" ADD CONSTRAINT "LessonParagraph_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonParagraph" ADD CONSTRAINT "LessonParagraph_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
