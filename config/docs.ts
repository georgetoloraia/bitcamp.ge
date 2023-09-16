import { DocsConfig } from "types"

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "პროგრამები",
      href: "/programs",
    },
    {
      title: "საბავშვი პროგრამები",
      href: "/guides",
    },   
    {
      title: "კურსები",
      href: "/courses",
    },
  ],
  sidebarNav: [
    {
      title: "კურსები",
      items: [
        {
          title: "HTML",
          href: "/courses/html",
        },
      ],
    },
  ],
  universalProgramsNav: [
    {
      title: "უნივერსალური პროგრამები",
      items: [
        {
          title: "პროგრამირების საფუძვლები",
          href: "/programs/universal/programming",
        },
        {
          title: "ვების საფუძვლები",
          href: "/programs/universal/web",
        },
      ],
    },
  ],
  programsNav: [
    {
      title: "BitCamp - ის პროგრამები",
      items: [
        {
          title: "უნივერსალური",
          href: "/programs/universal",
        },
        {
          title: "Front-End React",
          href: "/programs/react",
        },
        {
          title: "Front-End Vue",
          href: "/programs/vue",
        },
        {
          title: "Back-End Python",
          href: "/programs/python",
        },
        {
          title: "Back-End Node.js",
          href: "/programs/nodejs",
        },
        {
          title: "Full-Stack",
          href: "/programs/full-stack",
        },
        {
          title: "PRO - სუპერ ინტენსიური",
          href: "/programs/pro",
        },
        {
          title: "Kids - საბავშვო",
          href: "/programs/kids",
        },

      ],
    },
  ]
}
