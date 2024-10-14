import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';


export async function GET() {
    try {
        const objetos = await prisma.objeto.findMany();
        return NextResponse.json(objetos, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const { titulo, fecha, descripcion } = data;

        const nuevoObjeto = await prisma.objeto.create({
            data: {
                titulo,
                fecha,
                descripcion,
            },
        });

        return NextResponse.json(nuevoObjeto, { status: 201 });
    } catch (error) {

        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
}
