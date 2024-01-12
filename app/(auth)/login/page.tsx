import { Metadata } from "next"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { UserAuthForm } from "@/components/user-auth-form"

export const metadata: Metadata = {
  title: "შესვლა",
  description: "Login to your account",
}

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          უკან
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <img width={"120px"} height={"120px"} className="mx-auto" src="/images/logo.jpg" />
          <h1 className="text-2xl font-semibold tracking-tight">
            შესვლა
          </h1>
          <p className="text-sm text-muted-foreground">
            სისტემაში შესასვლელად შეიყვანეთ თქვენი ელ.ფოსტის მისამართი და პაროლი
          </p>
        </div>
        <UserAuthForm showAdditionalFields={false} />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            თუ ჯერ არ გაქვთ BitCamp - ის ექაუნთი გაიარეთ რეგისტრაცია
          </Link>
        </p>
      </div>
    </div>
  )
}
