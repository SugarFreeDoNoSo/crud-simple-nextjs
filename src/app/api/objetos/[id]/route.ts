import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface Params {
    params: {
        id: string;
    };
}

export async function GET(request: NextRequest, { params }: Params) {
    try {
        const { id } = params;
        const objeto = await prisma.objeto.findUnique({
            where: { id: Number(id) },
        });

        if (!objeto) {
            return NextResponse.json({ error: 'Objeto no encontrado' }, { status: 404 });
        }

        return NextResponse.json(objeto, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
}

export async function PUT(request: NextRequest, { params }: Params) {
    try {
        const { id } = params;
        const data = await request.json();
        const { titulo, fecha, descripcion } = data;

        const objetoActualizado = await prisma.objeto.update({
            where: { id: Number(id) },
            data: {
                titulo,
                fecha,
                descripcion,
            },
        });

        return NextResponse.json(objetoActualizado, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

    }
}

export async function DELETE(request: NextRequest, { params }: Params) {
    try {
        const { id } = params;

        await prisma.objeto.delete({
            where: { id: Number(id) },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
}
