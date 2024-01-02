"use client"

import React, { useEffect, useRef } from "react"
import Image from "next/image"
import astronaut from "@/public/images/hero/astronaut.png"
import bg_code from "@/public/images/hero/bg-code.png"
import js from "@/public/images/hero/js-planet.png"
import orbit from "@/public/images/hero/orbit.png"
import { motion } from "framer-motion"

export default function Hero() {
  const planetRef = useRef<HTMLDivElement | null>(null)
  const parentDivRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const parentDiv = parentDivRef.current
    const planet = planetRef.current

    if (!parentDiv || !planet) {
      return
    }

    const radius = parentDiv.offsetWidth / 2

    const orbitAnimation = () => {
      const speed = 0.001 // Adjust the speed as needed
      const angle = performance.now() * speed

      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius

      planet.style.transform = ` translate(${x}px, ${y}px)`

      requestAnimationFrame(orbitAnimation)
    }

    orbitAnimation()
  }, [parentDivRef, planetRef])

  return (
    <div className="relative -mt-16 h-screen">
      <Image
        src={bg_code}
        alt="background"
        className="absolute top-20 -mt-16 h-screen w-full opacity-25"
      />
      <div className="absolute right-0 top-1/2 w-3/6 -translate-y-1/2 rounded-full bg-red-300">
        <div className="relative" ref={parentDivRef}>
          <Image src={orbit} alt="orbit" className="relative z-10" />

          <motion.div
            // transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            className="absolute left-1/2 top-1/2 z-[99] w-1/3 bg-red-300"
            // ref={planetRef}
          >
            <Image src={js} alt="javascript planet" className="h-full w-full" />
          </motion.div>

          <motion.div
            animate={{
              y: [-3, 3, -3],
            }}
            transition={{ repeat: Infinity, duration: 6 }}
            className="absolute top-0 z-30"
          >
            <Image src={astronaut} alt="astronaut" className="h-full w-full" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
