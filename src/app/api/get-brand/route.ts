// src/app/api/get-products-by-brand/route.ts
import prisma from "@/app/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const brand = searchParams.get("brand");

  try {
    const products = await prisma.product.findMany({
      where: {
        brand: brand || undefined,
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products by brand:", error);
    return NextResponse.json(
      { error: "Error fetching products" },
      { status: 500 }
    );
  }
}
