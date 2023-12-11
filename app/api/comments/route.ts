import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

interface RequestBody {
  name: string
  email: string
  mobile: string
  comment: string
  postId: string
  source: string
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    console.log("esaaa post id", body.postId)

    await prisma.comment.create({
      data: {
        name: body.name,
        email: body.email,
        mobile: body.mobile,
        comment: body.comment,
        source: body.source,
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}
