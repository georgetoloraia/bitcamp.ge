import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { ServiceCard } from "@/components/service-card"

import { RocketIcon } from "@radix-ui/react-icons"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import PricingCardComponent from "@/components/price-component"
import { getCurrentUser } from "@/lib/session"
import IntentNavigator from "@/components/intent-navigator"
import ServiceNavigator from "@/components/service-navigator"


export const metadata = {
  title: "შეძენილი სერვისები",
}


export default async function DashboardPage(pageProps) {
  return (
    <DashboardShell>
      <DashboardHeader heading="ჩემი სივრცე" text="">
      </DashboardHeader>
      <ServiceNavigator />

      <PricingCardComponent />
    </DashboardShell>
  )
}
