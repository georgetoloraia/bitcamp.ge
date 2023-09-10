import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { programs } from "@/config/programs"
import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"


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
      <DashboardHeader heading="სრული პროგრამები" text="სრული პროგრამები შენთვისაა თუ სრულიად 0 - დან იწყებ. თუ არ გქონია პროგრამირების გამოცდილება და ვებ ტექნოლოგიებსაც ახლა უდნა გაეცნო მაშინ სწორ ადგილას ხარ.">
        {/* <PostCreateButton /> */}
      </DashboardHeader>
      <div>

<section
        id="programs"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent "
      >
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {programs.map((program) => {
            const Icon = Icons[program.icon]
            return (
              <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-[400px] flex-col justify-between rounded-md p-6">
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
                    <Link
                      href={program.url}
                      className={
                        buttonVariants({ variant: "default" }) + " mb-4"
                      }
                    >
                      შეძენა
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="mx-auto text-center md:max-w-[58rem]">
          <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Taxonomy also includes a blog and a full-featured documentation site
            built using Contentlayer and MDX.
          </p>
        </div>
      </section>
      </div>
    </DashboardShell>
  )
}
