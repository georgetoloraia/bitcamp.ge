
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


export const metadata = {
  title: "შეძენილი სერვისები",
}

export default async function DashboardPage(pageProps) {
  return (
    <DashboardShell>
      <DashboardHeader heading="ჩემი სივრცე" text="">
        {/* <PostCreateButton /> */}
      </DashboardHeader>
      <div>
        <section className="container space-y-6 bg-slate-50 dark:bg-transparent ">
          <Alert>
            <RocketIcon className="h-4 w-4" />
            <AlertTitle>ყურადღება!</AlertTitle>
            <AlertDescription>
              <br />
              გმადლობთ რომ სარგებლობთ BitCamp - ის სასწავლო სერვისებით 🙏
              <br />
              <br />
              ამ გვერდზე შეგიძლიათ შეარჩიოთ თქვენთვის სასურველი სერვისი და დაიწყოთ სწავლა და ბრძოლა 🔥✊
              <br />
              <br />
              ამავე გვერდზე შეძლებთ უკვე შეძენილი სერვისების ნახვას და მართვას ✅
            </AlertDescription>
          </Alert>


          <ServiceCard cardTitle={"უფასო - 0 ლარი / თვეში"} cardDescription={"უფასო პროგრამა BitCamp - ში."} />
          <ServiceCard cardTitle={"საერთო სამენტორო - 100 ლარი / თვეში"} cardDescription={"საერთო სამენორო მომსახურება."} />
        </section>
      </div>

      <PricingCardComponent />
    </DashboardShell>
  )
}
