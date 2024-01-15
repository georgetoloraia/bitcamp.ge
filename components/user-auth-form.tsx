"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { userAuthSchema } from "@/lib/validations/auth"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  showAdditionalFields?: boolean;
}

type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm({ className, showAdditionalFields = true, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema)
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()


  async function onSubmit(data: FormData) {
    setIsLoading(true)

    if (showAdditionalFields) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        response
      })
    }

    const signInResult = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: true,
      callbackUrl: searchParams?.get("from") || "/dashboard",
    })

    setIsLoading(false)

    return toast({
      title: "გამარჯობა 👋",
      description: "კეთილი იყოს შენი მობრძანება 🎉",
    })
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="username">
              Username
            </Label>
            <Input
              id="username"
              placeholder="username"
              type="hidden"
              autoCapitalize="none"
              autoCorrect="off"
              disabled
              {...register("username")}
            />
          </div>

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              ელ.ფოსტა
            </Label>
            <Input
              id="email"
              placeholder="ელ.ფოსტის მისამართი"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isGitHubLoading}
              {...register("email")}
              onChange={(e) => { setValue("username", e.target.value); }}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {showAdditionalFields && (
            <>
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="first_name">
                  სახელი
                </Label>
                <Input
                  id="first_name"
                  placeholder="თქვენი სახელი"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="first_name"
                  autoCorrect="off"
                  disabled={isLoading || isGitHubLoading}
                  {...register("first_name")}
                />
                {errors?.first_name && (
                  <p className="px-1 text-xs text-red-600">
                    {errors.first_name.message}
                  </p>
                )}
              </div>
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="last_name">
                  გვარი
                </Label>
                <Input
                  id="last_name"
                  placeholder="თქვენი გვარი"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="last_name"
                  autoCorrect="off"
                  disabled={isLoading || isGitHubLoading}
                  {...register("last_name")}
                />
                {errors?.last_name && (
                  <p className="px-1 text-xs text-red-600">
                    {errors.last_name.message}
                  </p>
                )}
              </div>

              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="phone_number">
                  ტელეფონი
                </Label>
                <Input
                  id="phone_number"
                  placeholder="ტელეფონის ნომერი"
                  type="text"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isLoading || isGitHubLoading}
                  {...register("phone_number")}
                />
                {errors?.phone_number && (
                  <p className="px-1 text-xs text-red-600">
                    {errors.phone_number.message}
                  </p>
                )}
              </div>
            </>
          )}
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              პაროლი
            </Label>
            <Input
              id="password"
              placeholder="პაროლი"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading || isGitHubLoading}
              {...register("password")}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {showAdditionalFields ? "რეგისტრაცია" : "შესვლა"}
          </button>
        </div>
      </form>
    </div>
  )
}
