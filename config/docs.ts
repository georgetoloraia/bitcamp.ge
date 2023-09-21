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
  aboutProgramsNav: [
    {
      title: "სასწავლო პროცესი",
      items: [
        {
          title: "სტრუქტურა",
          href: "/programs/about/structure",
        },
        {
          title: "ხანგრძლივობა",
          href: "/programs/about/duration",
        },
        {
          title: "საფასური",
          href: "/programs/about/pricing",
        },
        // {
        //   title: "ლექტორები",
        //   href: "/programs/about/lecturers",
        // },
        // {
        //   title: "მენტორები",
        //   href: "/programs/about/mentors",
        // },
        // {
        //   title: "სწავლის დაწყება",
        //   href: "/programs/about/start",
        // },
        {
          title: "რეგისტრაცია",
          href: "/programs/about/registration",
        },
      ],
    },
  ],
  universalProgramsNav: [
    {
      title: "უნივერსალური",
      items: [
        {
          title: "პროგრამირების საფუძვლები",
          href: "/programs/universal/programming",
        },
      ],
    },
  ],
  frontendProgramsNav: [
    {
      title: "Front-End",
      items: [
        {
          title: "React",
          href: "/programs/front-end/react",
        },
        {
          title: "Vue",
          href: "/programs/front-end/vue",
        },
      ],
    },
  ],
  backendProgramsNav: [
    {
      title: "Back-End",
      items: [
        {
          title: "Python",
          href: "/programs/back-end/python",
        },
        {
          title: "Node.js",
          href: "/programs/back-end/nodejs",
        },
      ],
    },
  ],
  fullstackProgramsNav: [
    {
      title: "Full-Stack",
      items: [
        {
          title: "🚀 BitCamp PRO",
          href: "/programs/full-stack/pro",
        },
      ],
    },
  ],
  kidsProgramsNav: [
    {
      title: "საბავშვო პროგრამები",
      items: [
        {
          title: "👾 BitCamp Kids",
          href: "/programs/kids",
        },
      ],
    },
  ],
}
