
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
import { useEffect } from "react"
import { ZapIcon } from "lucide-react"
import Link from "next/link"


export const metadata = {
  title: "შეძენილი სერვისები",
}

const fetchEnrollments = async (user) => {
  const res = await fetch('https://platform.bitcamp.ge/enrollments', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${user.accessToken}`
    }
  });
  const enrollments = await res.json();

  return enrollments;
}

export default async function DashboardPage(pageProps) {
  const user = await getCurrentUser()
  const enrollments = await fetchEnrollments(user);

  return (
    <DashboardShell>
      <DashboardHeader heading="ჩემი სივრცე" text="">
        {/* <PostCreateButton /> */}
      </DashboardHeader>
      <div>
        <section className="container space-y-6 bg-slate-50 dark:bg-transparent ">
          {/* <Alert>
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
          </Alert> */}

          <Alert variant="default">
            <ZapIcon className="h-4 w-4" />
            <AlertTitle>გადახდა და სწავლის დაწყება!</AlertTitle>
            <AlertDescription>
              BitCamp - ის სერვისების შეძენას შეძლებთ 15 იანვრიდან, ამავე გვერდზე. <br /> <br />

              სწავლა დაიწყება 22 იანვარს.
              <br />
              <br />
              <ul>
                <strong>სერვისები და ფასები:</strong>
                <li>
                  BitCamp Kids - 50 ლარი / თვეში
                </li>
                <li>
                  საერთო სამენტორო - 100 ლარი / თვეში
                </li>
                <li>
                  პირადი მენტორის აყვანა - 350 ლარი / თვეში
                </li>
              </ul>

              <br />
              <br />
              დამატებითი კითხვებისთვის მიმართეთ BitCamp - ის Facebook გვერდს: <Link href="https://www.facebook.com/bitcamp.ge" target="_blank">
                https://www.facebook.com/bitcamp.ge
              </Link>
            </AlertDescription>
          </Alert>


          {/* {enrollments.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">შეძენილი სერვისები</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {enrollments.map((enrollment) => {
                  console.log(enrollment)
                  return (
                    <ServiceCard
                      key={enrollment.id}
                      cardTitle={enrollment.service_id}
                      cardDescription={enrollment.program_id}
                      payments={enrollment.payments}
                      service={enrollment.service}
                      program={enrollment.program}
                      status={enrollment.status}
                    />)
                })}
              </div>
            </div>
          )} */}


        </section>
      </div>

      {/* <PricingCardComponent /> */}
    </DashboardShell>
  )
}
