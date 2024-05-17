// app/api/add-item/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { sql } from "@vercel/postgres";

export async function POST(request: NextRequest) {
    const { nombre, type } = await request.json();

    try {
        if (type === 'add') {
            await sql`UPDATE FARMASYA SET cantidad = cantidad + 1 WHERE name = ${nombre}`;
        }
        else if (type === 'substract') {
            await sql`UPDATE FARMASYA SET cantidad = cantidad - 1 WHERE name = ${nombre}`;
        }

        return NextResponse.json({ message: 'Item updated successfully' });
    } catch (error) {
        console.error('Error al actualizar la cantidad:', error);
        return NextResponse.json({ message: 'Error al actualizar la cantidad' }, { status: 500 });
    }
}
