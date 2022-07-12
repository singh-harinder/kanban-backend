/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Board` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "TaskPriorityType" AS ENUM ('low', 'medium', 'high');

-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "user" UUID;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "isComplete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "priority" "TaskPriorityType";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "isAdmin" SET DEFAULT true;

-- CreateTable
CREATE TABLE "Member" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "email" TEXT NOT NULL DEFAULT E'',
    "password" TEXT,
    "leader" UUID,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Member_tasks" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_email_key" ON "Member"("email");

-- CreateIndex
CREATE INDEX "Member_leader_idx" ON "Member"("leader");

-- CreateIndex
CREATE UNIQUE INDEX "_Member_tasks_AB_unique" ON "_Member_tasks"("A", "B");

-- CreateIndex
CREATE INDEX "_Member_tasks_B_index" ON "_Member_tasks"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Board_name_key" ON "Board"("name");

-- CreateIndex
CREATE INDEX "Board_user_idx" ON "Board"("user");

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_leader_fkey" FOREIGN KEY ("leader") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Member_tasks" ADD CONSTRAINT "_Member_tasks_A_fkey" FOREIGN KEY ("A") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Member_tasks" ADD CONSTRAINT "_Member_tasks_B_fkey" FOREIGN KEY ("B") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
