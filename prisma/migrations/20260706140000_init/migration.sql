-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Relationship" AS ENUM ('FAMILY', 'FRIEND', 'COLLEAGUE');

-- CreateEnum
CREATE TYPE "WishStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "Site" (
    "id" TEXT NOT NULL,
    "honoreeName" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "heroPhotoUrl" TEXT NOT NULL,
    "countdownTarget" TIMESTAMP(3) NOT NULL,
    "pageCopy" TEXT NOT NULL,

    CONSTRAINT "Site_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wish" (
    "id" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "relationship" "Relationship" NOT NULL,
    "message" TEXT NOT NULL,
    "photoUrl" TEXT,
    "videoUrl" TEXT,
    "status" "WishStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Wish_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimelineEntry" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "TimelineEntry_pkey" PRIMARY KEY ("id")
);
