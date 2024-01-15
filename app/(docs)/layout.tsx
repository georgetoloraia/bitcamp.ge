import Link from "next/link"

import { docsConfig } from "@/config/docs"
import { marketingConfig } from "@/config/marketing"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { DocsSearch } from "@/components/search"
import { DocsSidebarNav } from "@/components/sidebar-nav"
import { SiteFooter } from "@/components/site-footer"
import { getCurrentUser } from "@/lib/session"
import { UserAccountNav } from "@/components/user-account-nav"
import { SignInUpNav } from "@/components/sing-in-up-nav"

interface DocsLayoutProps {
  children: React.ReactNode
}

export default async function DocsLayout({ children }: DocsLayoutProps) {
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b border-mainBorderColor bg-background">
        <div className="container flex h-16 justify-between">
          <MainNav items={marketingConfig.mainNav}>
            <DocsSidebarNav items={docsConfig.sidebarNav} />
          </MainNav>
          <div className="flex items-center space-x-4 sm:justify-end">
            <span className="px-0.1 ">
              {user ? user.name : ""}
            </span>
            {user ? (<UserAccountNav
              user={{
                name: user.name,
                email: user.email,
              }}
            />) : (
              <SignInUpNav />
            )}
          </div>
        </div>
      </header>
      <div className="container flex-1">{children}</div>
      <SiteFooter className="border-t" />
    </div>
  )
}
