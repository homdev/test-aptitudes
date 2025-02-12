/*
  Warnings:

  - Added the required column `class` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- Étape 1 : Ajouter la colonne en tant que nullable
ALTER TABLE "Student" ADD COLUMN "class" TEXT;

-- Étape 2 : Mettre à jour les enregistrements existants avec Master 1
UPDATE "Student" SET "class" = 'master1' WHERE "class" IS NULL;

-- Étape 3 : Rendre la colonne non nullable
ALTER TABLE "Student" ALTER COLUMN "class" SET NOT NULL;
