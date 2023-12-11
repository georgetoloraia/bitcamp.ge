import Image from "next/image"
import Link from "next/link"
import { allMentors } from "contentlayer/generated"
import { compareDesc } from "date-fns"

import { formatDate } from "@/lib/utils"

interface MentorsComponentPorps {
  columns: string
}


export default function MentorsComponent({columns, ...props}: MentorsComponentPorps) {
  const mentors = allMentors
    .filter(mentor => mentor.ogImage)
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

  return (
    <div>
      <h2 className="
      font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl
      mb-7
      ">
        მენტორები
      </h2>
      {mentors?.length ? (
        <div className={"grid gap-10 sm:grid-cols-" + columns}>
          {mentors.map((post, index) => (
            <article
              key={post._id}
              className="group relative flex flex-col space-y-2"
            >
              {post.ogImage && (
                <Image
                  src={post.ogImage}
                  alt={post.title}
                  width={804}
                  height={452}
                  className="rounded-md border bg-muted transition-colors"
                  priority={index <= 1}
                />
              )}
              <h2 className="text-2xl font-extrabold">{post.title}</h2>
              {post.description && (
                <p className="text-muted-foreground">{post.description}</p>
              )}
              <Link href={post.slug} className="absolute inset-0">
                <span className="sr-only">View Article</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p>მენტორების შესახენ ინფო ჯერ არ დამატებულა.</p>
      )}
    </div>
  )
}

