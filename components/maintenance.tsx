import Link from "next/link"

import { siteConfig } from "@/config/site"

export function Maintenance() {
  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <Link
          href={siteConfig.links.discord}
          className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
          target="_blank"
        >
          შემოგვიერთდი Discord - ზე
        </Link>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          BitCamp - ის საიტი განახლების რეჟიმშია. ყველა სასწავლო პროგრამა
          დაიწყება ერთდროულად, სექტემბრის ბოლომდე.
        </p>
      </div>
    </section>
  )
}
