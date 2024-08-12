import prisma from "@/app/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
    try {
        const { username, email, phoneNumber, password } = await request.json();
        console.log('Datos recibidos:', { username, email, phoneNumber, password });

        // Verifica si los valores son correctos
        if (!username || !email || !phoneNumber || !password) {
            throw new Error('Campos requeridos faltantes');
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.users.create({
            data: {
                username,
                email,
                phoneNumber,
                password: hashedPassword, // Almacenar la contraseña hasheada
            },
        });

        console.log('Usuario creado exitosamente:', newUser);

        return NextResponse.json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);

        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        return NextResponse.json(
            { error: `Error creating user: ${errorMessage}` },
            { status: 500 }
        );
    }
}
