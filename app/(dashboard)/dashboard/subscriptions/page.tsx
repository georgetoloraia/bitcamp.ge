import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { env } from "@/env.mjs"
import SubscriptionsList from "@/components/subscriptions-list"


export const metadata = {
  title: "შეძენილი სერვისები",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="სრული პროგრამები" text="სრული პროგრამები შენთვისაა თუ სრულიად 0 - დან იწყებ. თუ არ გქონია პროგრამირების გამოცდილება და ვებ ტექნოლოგიებსაც ახლა უდნა გაეცნო მაშინ სწორ ადგილას ხარ.">
        {/* <PostCreateButton /> */}
      </DashboardHeader>
      <div>

    <section
        id="programs"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent "
      >
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-1 md:max-w-[64rem] md:grid-cols-1">
          <SubscriptionsList />
        </div>
      </section>
      </div>
    </DashboardShell>
  )
}
