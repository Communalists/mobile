import { prisma } from "@/utils/PrismaClient";
import { User } from "@prisma/client";

export async function GET() {
    const users = await prisma.user.findMany();

    return Response.json({
        users,
    });
}

export async function POST(req: Request) {
    const { name, email }: User = await req.json();

    if (!name) {
        return Response.json(
            {
                message: "Name is required!",
            },
            { status: 400 }
        );
    }

    if (!email) {
        return Response.json(
            {
                message: "Email is required!",
            },
            { status: 400 }
        );
    }

    return await prisma.user
        .create({
            data: {
                name,
                email,
            },
        })
        .then(() => {
            return Response.json(
                {
                    message: "User was created!",
                },
                { status: 200 }
            );
        })
        .catch(() => {
            return Response.json(
                {
                    message: "There was an error when creating a user!",
                },
                { status: 500 }
            );
        });
}
