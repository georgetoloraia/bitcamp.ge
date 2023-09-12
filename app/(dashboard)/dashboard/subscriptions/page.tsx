import Link from "next/link"
import { redirect } from "next/navigation"

import { env } from "@/env.mjs"
import { siteConfig } from "@/config/site"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import SubscriptionsList from "@/components/subscriptions-list"
import { Button } from "@/components/ui/button"

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
      <DashboardHeader
        heading="შეძენილი სერვისები"
        text="ქვემოთ მოცემულია შენს მიერ შეძენილი აქტიური სერვისები."
      >
        {/* <PostCreateButton /> */}
      </DashboardHeader>
      <div>
        <section
          id="programs"
          className="container space-y-6 bg-slate-50 dark:bg-transparent "
        >
            <SubscriptionsList />
        </section>
      </div>
    </DashboardShell>
  )
}
