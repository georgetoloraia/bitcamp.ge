import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./ui/button"

export default function RegistrationBtn() {
  return (
    <Link
      href="/programs/about/registration"
      className={cn(
        buttonVariants({ variant: "secondary", size: "lg" }),
        "px-4"
      )}
    >
      რეგისტრაცია 🔥
    </Link>
  )
}
