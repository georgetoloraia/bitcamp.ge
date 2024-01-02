"use client"

import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import astronaut from "@/public/images/hero/astronaut.png"
import bg_code from "@/public/images/hero/bg-code.png"
import js from "@/public/images/hero/js-planet.png"
import orbit from "@/public/images/hero/orbit.png"
import python from "@/public/images/hero/python-planet.png"
import react from "@/public/images/hero/react-planet.png"
import { motion } from "framer-motion"

import { Button, buttonVariants } from "./ui/button"

const planets = [
  { name: "JavaScript", image: js },
  { name: "python", image: python },
  { name: "react", image: react },
]

const programs = [
  { url: "#", title: "უფასო კურსები" },
  { url: "#", title: "სასწავლო პროგრამები" },
  { url: "#", title: "აიყვანე პირადი მენტორი" },
]

export default function Hero() {
  const planetRefs = useRef(
    planets.map(() => React.createRef<HTMLDivElement>())
  )
  const parentDivRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const parentDiv = parentDivRef.current

    if (!parentDiv) {
      return
    }

    const radius = parentDiv.offsetWidth / 2

    const orbitAnimation = () => {
      const speed = 0.0001 // Adjust the speed as needed
      const angle = performance.now() * speed
      const rotationAngle = angle

      planets.forEach((planet, index) => {
        const planetRef = planetRefs.current[index]

        if (planetRef && planetRef.current) {
          const x =
            Math.cos(angle + (index * Math.PI * 2) / planets.length) * radius
          const y =
            Math.sin(angle + (index * Math.PI * 2) / planets.length) * radius

          const distanceFromCenter = Math.sqrt(x ** 2 + y ** 2)

          if (distanceFromCenter <= radius) {
            planetRef.current.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rotationAngle}rad)`
          }
        }
      })

      requestAnimationFrame(orbitAnimation)
    }

    orbitAnimation()
  }, [parentDivRef, planetRefs])

  return (
    <div className="relative -mt-16 h-screen">
      <Image
        src={bg_code}
        alt="background"
        className="absolute -z-10 -mt-24 opacity-25"
      />
      <div className="flex h-full">
        <div className="flex w-1/2 flex-col justify-center">
          <h1 className="text-[40px] font-bold">გინდა ისწავლო პროგრამირება?</h1>
          <div className="flex flex-col gap-4">
            {programs.map((program) => {
              return (
                <Link
                  href={program.url}
                  className={
                    buttonVariants({ variant: "default" }) +
                    " text-[19px] w-fit"
                  }
                >
                  {program.title}
                </Link>
              )
            })}
          </div>
        </div>
        <div className="flex w-1/2 justify-end self-center rounded-full">
          <div className="relative flex w-9/12 items-center justify-center">
            <div ref={parentDivRef} className="relative z-10 rounded-full ">
              <Image src={orbit} alt="orbit" />
            </div>

            {planets.map((planet, index) => (
              <motion.div
                key={index}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                className="absolute left-1/2 top-1/2 z-30 w-2/6 -translate-x-1/2 -translate-y-1/2 transition-all"
                ref={planetRefs.current[index]}
              >
                <Image
                  src={planet.image}
                  alt={`${planet.name} planet`}
                  className="h-full w-full"
                />
              </motion.div>
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
