import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "სრული პროგრამები",
      href: "/dashboard/programs",
      icon: "post",
    },
    {
      title: "საგნები",
      href: "/dashboard/subjects",
      icon: "post",
    },
    {
      title: "შეძენილი სერვისები",
      href: "/dashboard/subscriptions",
      icon: "post",
    },
    {
      title: "Posts",
      href: "/dashboard",
      icon: "post",
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: "billing",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}
