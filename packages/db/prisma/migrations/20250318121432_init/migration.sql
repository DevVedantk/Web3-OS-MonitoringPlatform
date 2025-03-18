-- CreateEnum
CREATE TYPE "siteStatus" AS ENUM ('Good', 'Bad');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "website" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "disabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "website_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Validator" (
    "id" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "Location" TEXT NOT NULL,

    CONSTRAINT "Validator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebSiteTick" (
    "id" TEXT NOT NULL,
    "WebsiteId" TEXT NOT NULL,
    "ValidatorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "websiteStatus" "siteStatus" NOT NULL,
    "latency" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "WebSiteTick_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "website_id_key" ON "website"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Validator_id_key" ON "Validator"("id");

-- CreateIndex
CREATE UNIQUE INDEX "WebSiteTick_id_key" ON "WebSiteTick"("id");

-- AddForeignKey
ALTER TABLE "WebSiteTick" ADD CONSTRAINT "WebSiteTick_WebsiteId_fkey" FOREIGN KEY ("WebsiteId") REFERENCES "website"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebSiteTick" ADD CONSTRAINT "WebSiteTick_ValidatorId_fkey" FOREIGN KEY ("ValidatorId") REFERENCES "Validator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
