// app/api/add-item/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { sql } from "@vercel/postgres";

export async function POST(request: NextRequest) {
    const { nombre, fecha, cantidad } = await request.json();
    console.log(nombre, fecha, cantidad)

    try {
        await sql`INSERT INTO FARMASYA VALUES (${nombre}, ${fecha}, ${cantidad})`;

        return NextResponse.json({ message: 'Item created successfully' });
    } catch (error) {
        console.error('Error al actualizar la cantidad:', error);
        return NextResponse.json({ message: 'Error al crear el nuevo producto' }, { status: 500 });
    }
}
