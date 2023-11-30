import { notFound } from "next/navigation"
import { allClasses } from "contentlayer/generated"

import { getTableOfContents } from "@/lib/toc"
import { Mdx } from "@/components/mdx-components"
import { DocsPageHeader } from "@/components/page-header"
import { DocsPager } from "@/components/pager"
import { DashboardTableOfContents } from "@/components/toc"

import "@/styles/mdx.css"
import { Metadata } from "next"

import { env } from "@/env.mjs"
import { absoluteUrl, generateDefaultMetaData } from "@/lib/utils"

interface ClassPageProps {
  params: {
    slug: string[]
  }
}

async function getClassFromParams(params) {
  const slug = params.slug?.join("/") || ""
  const study_class = allClasses.find((study_class) => study_class.slugAsParams === slug)

  if (!study_class) {
    null
  }

  return study_class
}

export async function generateMetadata({
  params,
}: ClassPageProps) {
  const page = await getClassFromParams(params)

  if (!page) {
    return {}
  }

  return generateDefaultMetaData(page);
}


export async function generateStaticParams(): Promise<
  ClassPageProps["params"][]
> {
  return allClasses.map((study_class) => ({
    slug: study_class.slugAsParams.split("/"),
  }))
}

export default async function DocPage({ params }: ClassPageProps) {
  const study_class = await getClassFromParams(params)

  if (!study_class) {
    notFound()
  }

  const toc = await getTableOfContents(study_class.body.raw)

  return (
    <main className="relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <DocsPageHeader heading={study_class.title} text={study_class.description} />
        <Mdx code={study_class.body.code} />
        <hr className="my-4 md:my-6" />
        <DocsPager doc={study_class} />
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
          <DashboardTableOfContents toc={toc} />
        </div>
      </div>
    </main>
  )
}
