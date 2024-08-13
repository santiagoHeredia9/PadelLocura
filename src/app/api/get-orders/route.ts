import prisma from "@/app/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const orders = await prisma.order.findMany({
            include: {
                user: true,
                products: true,
            },
        });

        return NextResponse.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json(
            { error: `Error fetching orders: ${error.message}` },
            { status: 500 }
        );
    }
}
