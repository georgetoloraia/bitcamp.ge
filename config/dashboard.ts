import { DashboardConfig } from "types"
import { marketingConfig } from "./marketing"

export const dashboardConfig: DashboardConfig = {
  mainNav: marketingConfig.mainNav,
  sidebarNav: [
    {
      title: "ჩემი სივრცე",
      href: "/dashboard",
      icon: "post",
    },
  ],
}
