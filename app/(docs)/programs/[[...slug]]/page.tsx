import { notFound } from "next/navigation"
import { allPrograms } from "contentlayer/generated"

import { getTableOfContents } from "@/lib/toc"
import { Mdx } from "@/components/mdx-components"
import { DocsPageHeader } from "@/components/page-header"
import { DocsPager } from "@/components/pager"
import { DashboardTableOfContents } from "@/components/toc"

import "@/styles/mdx.css"
import { Metadata } from "next"

import { env } from "@/env.mjs"
import { absoluteUrl, generateDefaultMetaData } from "@/lib/utils"

interface ProgramPageProps {
  params: {
    slug: string[]
  }
}

async function getProgramFromParams(params) {
  const slug = params.slug?.join("/") || ""
  const program = allPrograms.find((program) => program.slugAsParams === slug)

  if (!program) {
    null
  }

  return program
}

export async function generateMetadata({
  params,
}: ProgramPageProps) {
  const page = await getProgramFromParams(params)

  if (!page) {
    return {}
  }

  return generateDefaultMetaData(page);
}

export async function generateStaticParams(): Promise<
  ProgramPageProps["params"][]
> {
  return allPrograms.map((program) => ({
    slug: program.slugAsParams.split("/"),
  }))
}

export default async function DocPage({ params }: ProgramPageProps) {
  const program = await getProgramFromParams(params)

  if (!program) {
    notFound()
  }

  const toc = await getTableOfContents(program.body.raw)

  return (
    <main className="relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <DocsPageHeader heading={program.title} text={program.description} />
        <Mdx code={program.body.code} />
        <hr className="my-4 md:my-6" />
        <DocsPager doc={program} />
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
          <DashboardTableOfContents toc={toc} />
        </div>
      </div>
    </main>
  )
}
