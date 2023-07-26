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
import { absoluteUrl } from "@/lib/utils"

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
}: CoursePageProps): Promise<Metadata> {
  const course = await getCourseFromParams(params)

  if (!course) {
    return {}
  }

  const url = env.NEXT_PUBLIC_APP_URL

  const ogUrl = new URL(`${url}/api/og`)
  ogUrl.searchParams.set("heading", course.description ?? course.title)
  ogUrl.searchParams.set("type", "Documentation")
  ogUrl.searchParams.set("mode", "dark")

  return {
    title: course.title,
    description: course.description,
    openGraph: {
      title: course.title,
      description: course.description,
      type: "article",
      url: absoluteUrl(course.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: course.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: course.title,
      description: course.description,
      images: [ogUrl.toString()],
    },
  }
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
