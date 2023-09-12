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
      title: "ჩემი სივრცე",
      href: "/dashboard",
      icon: "post",
    },
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
