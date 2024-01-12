import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { UserAuthForm } from "@/components/user-auth-form"

export const metadata = {
  title: "Create an account",
  description: "Create an account to get started.",
}

export default function RegisterPage() {
  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        შესვლა
      </Link>
      <div className="hidden h-full bg-muted lg:block" />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
          <img width={"120px"} height={"120px"} className="mx-auto" src="/images/logo.jpg" />
            <h1 className="text-2xl font-semibold tracking-tight">
              რეგისტრაცია
            </h1>
            <p className="text-sm text-muted-foreground">
              შეიყვანეთ მონაცემები და გაიარეთ რეგისტრაცია
            </p>
          </div>
          <UserAuthForm showAdditionalFields={true} />
          <p className="px-8 text-center text-sm text-muted-foreground">
            მხოლოდ 1 წესია მნიშვნელოვანი: <br /> თუ სწავლას დაიწყებ, გაჩერება არ მოსულა!
          </p>
        </div>
      </div>
    </div>
  )
}
