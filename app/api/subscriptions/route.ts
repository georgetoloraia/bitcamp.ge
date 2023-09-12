import { getServerSession } from "next-auth/next"

import { env } from "@/env.mjs"
import { authOptions } from "@/lib/auth"
import { createSubscription, fetchSubscriptionsByEmail } from "@/lib/payze"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session

    const email = user.email
    const subscriptions = await fetchSubscriptionsByEmail(email, "Active")

    return new Response(JSON.stringify(subscriptions.value))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST(req: Request) {
  const json = await req.json()
  const { productId } = json

  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session

    const subscriptionData = await createSubscription(
      user.email,
      productId,
      `${env.NEXT_PUBLIC_APP_URL}/dashboard`,
      `${env.NEXT_PUBLIC_APP_URL}/dashboard`
    )

    // Return the subscription URL
    return new Response(
      JSON.stringify({ subscriptionUrl: subscriptionData.data.transactionUrl })
    )
  } catch (error) {
    console.error("Subscription creation failed:", error)
    return new Response(null, { status: 500 })
  }
}
