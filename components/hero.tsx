"use client"

import "@/styles/animation.css"

import { planets, programs } from "@/config/hero"

import Image from "next/image"
import Link from "next/link"
import React from "react"
import animationHero from "@/public/images/hero/animation-hero.png"
import bg_code from "@/public/images/hero/bg-code.png"
import { buttonVariants } from "./ui/button"
import orbit from "@/public/images/hero/orbit.png"

export default function Hero() {
  return (
    <div className="relative h-fit py-14 max-sm:py-7">
      <Image
        src={bg_code}
        alt="background"
        className="absolute -top-28 -z-10 opacity-25 max-md:-top-20 max-md:h-full"
      />
      <div className="flex h-full max-sm:flex-col-reverse max-sm:justify-end">
        <div className="flex w-1/2  flex-col justify-center gap-7 max-sm:w-full">
          <h1 className="text-[45px] font-bold max-md:text-[30px] max-sm:mt-5 max-sm:text-[40px] max-sm:font-semibold">
            გინდა ისწავლო პროგრამირება?
          </h1>
          <div className="mt-2 flex flex-col gap-4">
            {programs.map((program, index) => (
              <Link
                href={program.url}
                className={
                  buttonVariants({ variant: "default" }) +
                  " mb-4 w-fit !font-bold"
                }
              >
                {program.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex w-1/2 justify-end self-center rounded-full max-sm:w-8/12 max-sm:justify-start max-[500px]:w-9/12 max-[424px]:w-full">
          <div className="relative right-10 -z-10 flex w-9/12 items-center justify-center max-lg:w-11/12 max-md:right-0 max-sm:w-full">
            <div className="relative z-10 rounded-full ">
              <Image src={orbit} alt="orbit" />
            </div>

            {planets.map((planet, index) => {
              return (
                <div
                  className={`absolute z-30`}
                  style={{
                    animation: `rotatePlanet${index} 40s linear infinite`,
                  }}
                >
                  <div
                 
                  className={`${planet.name ==='react'? 'w-1/4' :'w-4/12'} -translate-x-1/2 `}>
                    <Image
                     style={{
                      animation: `rotateEachPlanet 15s linear infinite`,
                    }}
                      src={planet.image}
                      alt="js"
                      className="h-full w-full"
                    />
                  </div>
                </div>
              )
            })}

            <div
              className="absolute z-30"
              style={{ animation: "bounceAnimation 5s infinite linear" }}
            >
              <Image
                src={animationHero}
                alt="hero animation logo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
