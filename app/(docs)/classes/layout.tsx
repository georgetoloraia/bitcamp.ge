import { docsConfig } from "@/config/docs"
import { DocsSidebarNav } from "@/components/sidebar-nav"


interface ProgramsLayoutProps {
  children: React.ReactNode
}

export default function ProgramLayout({ children }: ProgramsLayoutProps) {
  return (
    <div className="flex-1 md:grid  md:gap-6 lg:gap-10">
      {children}
    </div>
  )
}
