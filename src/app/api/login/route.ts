import prisma from "@/app/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();
        console.log('Datos recibidos:', { username, password });

        // Verifica si los valores son correctos
        if (!username || !password) {
            throw new Error('Campos requeridos faltantes');
        }

        // Buscar al usuario en la base de datos
        const user = await prisma.users.findUnique({
            where: { username },
        });

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Comparar la contraseña proporcionada con la almacenada
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Contraseña incorrecta');
        }

        // Eliminar la contraseña antes de devolver los datos
        const { password: _, ...userWithoutPassword } = user;

        console.log('Inicio de sesión exitoso:', userWithoutPassword);

        return NextResponse.json(userWithoutPassword);
    } catch (error) {
        console.error("Error logging in:", error);

        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        return NextResponse.json(
            { error: `Error logging in: ${errorMessage}` },
            { status: 401 }
        );
    }
}
