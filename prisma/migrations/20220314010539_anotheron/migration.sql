/*
  Warnings:

  - You are about to drop the column `avatarID` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatarID",
ADD COLUMN     "avatarLink" TEXT;
