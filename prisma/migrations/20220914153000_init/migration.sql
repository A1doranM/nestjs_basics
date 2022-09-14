/*
  Warnings:

  - Changed the type of `mileage` on the `Reports` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Reports" DROP COLUMN "mileage",
ADD COLUMN     "mileage" INTEGER NOT NULL;
