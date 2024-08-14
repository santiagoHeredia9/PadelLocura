import prisma from "@/app/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId, products, totalAmount } = await request.json();

    if (!userId || !products || !totalAmount) {
      throw new Error("Faltan campos requeridos");
    }

    // Crear la orden
    const newOrder = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        status: "pending",
        products: {
          create: products.map((product: { id: number; quantity: number }) => ({
            productId: product.id,
            quantity: product.quantity,
          })),
        },
      },
    });

    return NextResponse.json(newOrder);
  } catch (error: any) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: `Error creating order: ${error.message}` },
      { status: 500 }
    );
  }
}
