import Link from "next/link"
import { redirect } from "next/navigation"

import { subjects } from "@/config/subjects"
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

export const metadata = {
  title: "Catalog",
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
        heading="საგნები"
        text="თუ ზუსტად იცი რისი სწავლა გინდა, შეარჩიე სასურველი საგანი ან საგნები."
      >
        {/* <PostCreateButton /> */}
      </DashboardHeader>
      <div>
        <section
          id="programs"
          className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent"
        >
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-1 md:max-w-[64rem] md:grid-cols-1">
            {subjects.map((program) => {
              const Icon = Icons[program.icon]
              return (
                <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                  <div className="flex  flex-col justify-between rounded-md p-6">
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
                        <AccordionItem value="item-1">
                          <AccordionTrigger>
                            თეორიული ლექციები - 50 ლარი / თვეში
                          </AccordionTrigger>
                          <AccordionContent>
                            თეორიული ლექციები ჩატარდება კვირაში ერთხელ და
                            გამოქვეყნდება საჯაროდ. თუ გსურთ დაესწროთ ამ ლექციებს
                            ჩატარების მომენტში და დასვათ კითხვები, მაშინ
                            შეიძინეთ თეორიული ლექციებზე დასწრების უფლება მხოლოდ
                            50 ლარად თვეში.
                            <div className="py-6">
                              <Link
                                href={program.url}
                                className={
                                  buttonVariants({ variant: "default" }) + " mb-4"
                                }
                              >
                                შეძენა
                              </Link>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                          <AccordionTrigger>
                            პრაქტიკული სემინარები - 150 ლარი / თვეში
                          </AccordionTrigger>
                          <AccordionContent>
                            პრაქტიკული სემინარები გეხმარება თეორიულ ლექციაზე
                            მოსმენილი საკითხების პრაქტიკულად დამუშავებაში.
                            კვირაში 3 პრაქტიკული სემინარი ტარდება. პრაქტიკული
                            სემინარები არ გამოქვეყნდება საჯაროდ. მათზე დასწრების
                            და ჩანაწერებზე წვდომის მოსაპოვებლად შეიძინეთ
                            სემინარების პაკეტი 150 ლარად თვეში.
                            <div className="py-6">
                              <Link
                                href={program.url}
                                className={
                                  buttonVariants({ variant: "default" }) + " mb-4"
                                }
                              >
                                შეძენა
                              </Link>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                          <AccordionTrigger>
                            სამენტორო მომსახურება - 300 ლარი / თვეში
                          </AccordionTrigger>
                          <AccordionContent>
                            სრული სამენტორო მომსახურების შემთხვევაში მიიღებთ
                            წვდომას როგორც თეორიულ ლექციებზე, ისე პრაქტიკულ
                            სემინარებზე და ასევე გეყოლებათ პირადი მენტორი და
                            სასწავლო მენეჯერი რომელებიც დაგეხმარებიან სასწავლო
                            პროცესის მაქსიმალურად ეფექტურად წარმართვაში.
                            <div className="py-6">
                              <Link
                                href={program.url}
                                className={
                                  buttonVariants({ variant: "default" }) + " mb-4"
                                }
                              >
                                შეძენა
                              </Link>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mx-auto text-center md:max-w-[58rem]">
            <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Taxonomy also includes a blog and a full-featured documentation
              site built using Contentlayer and MDX.
            </p>
          </div>
        </section>
      </div>
    </DashboardShell>
  )
}
