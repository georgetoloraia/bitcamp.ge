import { env } from "@/env.mjs"

const authToken = `${env.PAYZE_API_KEY}:${env.PAYZE_API_SECRET}`

export async function fetchSubscriptionsByEmail(email: any, status: string) {
  const url = `https://payze.io/v2/api/subscriptions?$filter=email eq '${email}' and Status eq '${status}'`

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: authToken
      },
    })

    if (response.ok) {
      const data = await response.json()
      // Handle success
      console.log("Filtered subscriptions:", data)
      return data
    } else {
      console.error(
        `Error fetching subscriptions: ${response.status} ${response.statusText}`
      )
      return null
    }
  } catch (error) {
    // Handle error
    console.error("Error fetching subscriptions:", error)
    return null
  }
}

export async function createSubscription(
    email: any, 
    productId: number, 
    hookUrl: string, 
    callback: string) {
  const url = "https://payze.io/v2/api/subscription"
  const payload = {
    email,
    productId,
    hookUrl,
    callback,
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: authToken
      },
      body: JSON.stringify(payload),
    })

    if (response.ok) {
      const data = await response.json()
      // Handle success
      console.log("Subscription created:", data)
      return data
    } else {
      console.error(
        `Error creating subscription: ${response.status} ${response.statusText}`
      )
      return null
    }
  } catch (error) {
    // Handle error
    console.error("Error creating subscription:", error)
    return null
  }
}
