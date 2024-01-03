"use client"

import React, { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import astronaut from "@/public/images/hero/astronaut.png"
import bg_code from "@/public/images/hero/bg-code.png"
import js from "@/public/images/hero/js-planet.png"
import orbit from "@/public/images/hero/orbit.png"
import python from "@/public/images/hero/python-planet.png"
import react from "@/public/images/hero/react-planet.png"
import { motion } from "framer-motion"

import { buttonVariants } from "./ui/button"

const planets = [
  { name: "JavaScript", image: js },
  { name: "python", image: python },
  { name: "react", image: react },
]

const programs = [
  { url: "/classes", title: "უფასო კურსები" },
  { url: "/programs", title: "სასწავლო პროგრამები" },
  { url: "/mentors", title: "აიყვანე პირადი მენტორი" },
]

export default function Hero() {
  const planetRefs = useRef(
    planets.map(() => React.createRef<HTMLDivElement>())
  )
  const parentDivRef = useRef<HTMLDivElement | null>(null)

  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  }

  useEffect(() => {
    const parentDiv = parentDivRef.current

    if (!parentDiv) {
      return
    }

    const radius = parentDiv.offsetWidth / 2
    const duration = 1000
    const speed = 0.0001

    const startTime = performance.now()

    const orbitAnimation = () => {
      const currentTime = performance.now() - startTime
      const progress = (currentTime % duration) / duration
      const easedProgress = easeInOutQuad(progress)
      const angle = currentTime * speed

      planets.forEach((planet, index) => {
        const planetRef = planetRefs.current[index]

        if (planetRef && planetRef.current) {
          const x =
            Math.cos(angle + (index * Math.PI * 2) / planets.length) * radius
          const y =
            Math.sin(angle + (index * Math.PI * 2) / planets.length) * radius

          const distanceFromCenter = Math.sqrt(x ** 2 + y ** 2)

          if (distanceFromCenter <= radius) {
            const transformValue = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle}deg)`
            planetRef.current.style.transition = "transform 0.2s"
            planetRef.current.style.transform = transformValue
          }
        }
      })

      requestAnimationFrame(orbitAnimation)
    }

    orbitAnimation()
  }, [parentDivRef, planetRefs])

  return (
    <div className="relative h-fit py-14 max-sm:py-7">
      <Image
        src={bg_code}
        alt="background"
        className="absolute -top-28 -z-10 opacity-25 max-md:-top-20 max-md:h-full"
      />
      <div className="flex h-full max-sm:flex-col-reverse max-sm:justify-end">
        <div className="flex w-1/2 flex-col justify-center max-sm:w-full">
          <h1 className="text-[40px] font-bold max-md:text-[30px] max-sm:text-[40px] max-sm:font-semibold">
            გინდა ისწავლო პროგრამირება?
          </h1>
          <div className="mt-4 flex flex-col gap-4">
            {programs.map((program) => {
              return (
                <Link
                  href={program.url}
                  className="w-fit rounded-3xl bg-[#5a3ca0] px-4 py-2 text-[18px] text-white max-md:text-[16px] "
                >
                  {program.title}
                </Link>
              )
            })}
          </div>
        </div>
        <div className="flex w-1/2 justify-end self-center rounded-full max-sm:w-8/12 max-sm:justify-start max-[500px]:w-9/12 max-[424px]:w-full">
          <div className="relative right-10 -z-10 flex w-9/12 items-center justify-center max-lg:w-11/12 max-md:right-0 max-sm:w-full">
            <div ref={parentDivRef} className="relative z-10 rounded-full ">
              <Image src={orbit} alt="orbit" />
            </div>

            {planets.map((planet, index) => (
              <div
                key={index}
                className="absolute left-1/2 top-1/2 z-30 w-2/6 -translate-x-1/2 -translate-y-1/2 transition-all"
                ref={planetRefs.current[index]}
              >
                <Image
                  src={planet.image}
                  alt={`${planet.name} planet`}
                  className="h-full w-full"
                />
              </div>
            ))}

            <motion.div
              animate={{
                y: [-3, 3, -3],
              }}
              transition={{ repeat: Infinity, duration: 6 }}
              className="absolute top-0 z-30"
            >
              <Image
                src={astronaut}
                alt="astronaut"
                className="h-full w-full"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
