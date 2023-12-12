import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const body = await req.json()

    await prisma.preRegistartion.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        mobile: body.mobile,
        message: body.message,
        source: body.source,
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}
