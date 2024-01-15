import Link from "next/link"
import { redirect } from "next/navigation"

import { programs } from "@/config/programs"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"
import SubscribeButton from "@/components/subscribe-button"

export const metadata = {
  title: "სრული პროგრამები",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const posts = await db.post.findMany({
    where: {
      authorId: user.id,
    },
    select: {
      id: true,
      title: true,
      published: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="სრული პროგრამები"
        text="სრული პროგრამები შენთვისაა თუ სრულიად 0 - დან იწყებ. თუ არ გქონია პროგრამირების გამოცდილება და ვებ ტექნოლოგიებსაც ახლა უდნა გაეცნო მაშინ სწორ ადგილას ხარ."
      >
      </DashboardHeader>
      <div>
        <section
          id="programs"
          className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent "
        >
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-1 md:max-w-[64rem] md:grid-cols-1">
            {programs.map((program) => {
              const Icon = Icons[program.icon]
              return (
                <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                  <div className="flex flex-col justify-between rounded-md p-6">
                    <Icon className="h-12 w-12 " />
                    <div className="space-y-2">
                      <h3 className="font-bold">
                        {program.name}{" "}
                        <Badge variant="outline" className="mr-2">
                          {program.badge}
                        </Badge>
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {program.description}
                      </p>
                      <div className="py-4">
                        {program.technologies.map((technology) => (
                          <Badge variant="secondary" className="mr-2">
                            {technology}
                          </Badge>
                        ))}
                      </div>

                      <Accordion type="single" collapsible className="w-full">
                        {program.products.map((product, index) => (
                          <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger>
                              { product.title }
                            </AccordionTrigger>
                            <AccordionContent>
                              { product.description }
                              <div className="py-6">
                                <SubscribeButton productId={product.ProductId} />
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </DashboardShell>
  )
}
