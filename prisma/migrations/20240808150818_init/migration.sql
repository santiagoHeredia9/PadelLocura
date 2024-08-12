-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "material" TEXT,
    "thickness" DOUBLE PRECISION,
    "nucleo" TEXT,
    "balance" DOUBLE PRECISION,
    "form" TEXT,
    "rating" DOUBLE PRECISION,
    "stock" INTEGER NOT NULL,
    "brand" TEXT,
    "thumbnail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
