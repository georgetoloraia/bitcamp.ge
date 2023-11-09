import { notFound } from "next/navigation"
import { allCourses } from "contentlayer/generated"

import { getTableOfContents } from "@/lib/toc"
import { Mdx } from "@/components/mdx-components"
import { DocsPageHeader } from "@/components/page-header"
import { DocsPager } from "@/components/pager"
import { DashboardTableOfContents } from "@/components/toc"

import "@/styles/mdx.css"
import { Metadata } from "next"

import { env } from "@/env.mjs"
import { absoluteUrl, generateDefaultMetaData } from "@/lib/utils"

interface CoursePageProps {
  params: {
    slug: string[]
  }
}

async function getCourseFromParams(params) {
  const slug = params.slug?.join("/") || ""
  const course = allCourses.find((course) => course.slugAsParams === slug)

  if (!course) {
    null
  }

  return course
}

export async function generateMetadata({
  params,
}: CoursePageProps) {
  const page = await getCourseFromParams(params)

  if (!page) {
    return {}
  }

  return generateDefaultMetaData(page);
}


export async function generateStaticParams(): Promise<
  CoursePageProps["params"][]
> {
  return allCourses.map((course) => ({
    slug: course.slugAsParams.split("/"),
  }))
}

export default async function DocPage({ params }: CoursePageProps) {
  const course = await getCourseFromParams(params)

  if (!course) {
    notFound()
  }

  const toc = await getTableOfContents(course.body.raw)

  return (
    <main className="relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <DocsPageHeader heading={course.title} text={course.description} />
        <Mdx code={course.body.code} />
        <hr className="my-4 md:my-6" />
        <DocsPager doc={course} />
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
          <DashboardTableOfContents toc={toc} />
        </div>
      </div>
    </main>
  )
}
